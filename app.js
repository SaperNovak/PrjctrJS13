document.addEventListener('DOMContentLoaded', () => {

    // Керування відображенням табів
    const tabButtons = document.querySelectorAll('.tab-nav input[type="radio"]');

    tabButtons.forEach(tab => {
        tab.addEventListener('change', () => {
            // Приховати вміст таби, коли неактивна
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.style.display = 'none');

            // відобразити вміст таби, коли активна
            if (tab.checked) {
                const activeTabContent = document.getElementById(`content-${tab.id.split('-')[2]}`);
                if (activeTabContent) {
                    activeTabContent.style.display = 'block';
                }
            }
        });
    });

    // 
    tabButtons.forEach(tab => {
        if (tab.checked) {
            const activeTabContent = document.getElementById(`content-${tab.id.split('-')[2]}`);
            if (activeTabContent) {
                activeTabContent.style.display = 'block';
            }
        }
    });

    // Обробка першої таби: калькулятор проміжків дат
    document.getElementById('date1').addEventListener('change', updateEndDateMin);
    document.getElementById('date2').addEventListener('change', validateDates);

    document.getElementById('btn-plus-week').addEventListener('click', addWeek);
    document.getElementById('btn-plus-month').addEventListener('click', addMonth);
    
    document.getElementById('btn-days').addEventListener('click', () => calculateInterval('днів'));
    document.getElementById('btn-hours').addEventListener('click', () => calculateInterval('годин'));
    document.getElementById('btn-minutes').addEventListener('click', () => calculateInterval('хвилин'));
    document.getElementById('btn-seconds').addEventListener('click', () => calculateInterval('секунд'));
    
    document.getElementById('btn-clear-history').addEventListener('click', clearHistory);

    document.querySelectorAll('.radio-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.radio-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    displayHistory();
    updateEndDateMin();
});

// Сетимо вибір другої дати не раніе від першої
function updateEndDateMin() {
    const startDate = document.getElementById('date1').value;
    document.getElementById('date2').min = startDate;
}

// Додатково перевіряємо усови дат
function validateDates() {
    const startDate = new Date(document.getElementById('date1').value);
    const endDate = new Date(document.getElementById('date2').value);

    if (endDate < startDate) {
        document.getElementById('result').innerText = 'Дата завершення не може бути раніше за дату початку.';
    }
}

// Пресет тиждень
function addWeek() {
    const startDate = new Date(document.getElementById('date1').value);
    if (!isNaN(startDate)) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        document.getElementById('date2').value = endDate.toISOString().split('T')[0];
    }
}

// Пресет місяць
function addMonth() {
    const startDate = new Date(document.getElementById('date1').value);
    if (!isNaN(startDate)) {
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        document.getElementById('date2').value = endDate.toISOString().split('T')[0];
    }
}

// Головне обчислення інтервалів між датами
function calculateInterval(unit) {
    const date1 = new Date(document.getElementById('date1').value);
    const date2 = new Date(document.getElementById('date2').value);

    if (isNaN(date1) || isNaN(date2) || date2 < date1) {
        document.getElementById('result').innerText = 'Будьласка, введіть дати з .. по ...';
        return;
    }

    const intervalType = document.querySelector('.radio-button.active').getAttribute('data-value');
    let totalDays = (date2 - date1) / (1000 * 60 * 60 * 24);
    let validDays = totalDays;

    if (intervalType === 'будні дні') {
        validDays = calculateWorkDays(date1, date2);
    } else if (intervalType === 'вихідні дні') {
        validDays = calculateWeekends(date1, date2);
    }

    let result;
    switch (unit) {
        case 'днів':
            result = validDays;
            break;
        case 'годин':
            result = validDays * 24;
            break;
        case 'хвилин':
            result = validDays * 24 * 60;
            break;
        case 'секунд':
            result = validDays * 24 * 60 * 60;
            break;
        default:
            result = 0;
    }

    const formattedResult = `${result.toFixed(2)} ${unit}`;
    document.getElementById('result').innerText = `Interval: ${formattedResult}`;

    saveToHistory(formattedResult, date1, date2, intervalType);
    displayHistory();
}

// Обчислення робочих днів
function calculateWorkDays(start, end) {
    let count = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) count++;
    }
    return count;
}

// Обчислення вихідних днів
function calculateWeekends(start, end) {
    let count = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day === 0 || day === 6) count++;
    }
    return count;
}

// Збереження історії в LS
//function saveToHistory(result, unit, startDate, endDate, intervalType) {
    function saveToHistory(result, startDate, endDate, intervalType) {
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
 //   history.push(`З: ${startDate.toLocaleDateString()} По: ${endDate.toLocaleDateString()} | ${result} (${unit}, ${intervalType})`);
    history.push(`З: ${startDate.toLocaleDateString()} По: ${endDate.toLocaleDateString()} | ${result} (${intervalType})`);
    if (history.length > 10) {
        history.shift();
    }

    localStorage.setItem('calcHistory', JSON.stringify(history));
}

// Відображення історії
function displayHistory() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';

    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = item;
        historyList.appendChild(listItem);
    });
}

// Очищення історії
function clearHistory() {
    localStorage.removeItem('calcHistory');
    displayHistory();
}
