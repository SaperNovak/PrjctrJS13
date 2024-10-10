/*document.addEventListener('DOMContentLoaded', () => {

    // Керування відображенням табів
   
    const tabButtons = document.querySelectorAll('.tab-nav input[type="radio"]');
    const tabContents = document.querySelectorAll('.tab-content');
    const activeTabContent = document.getElementById(`content-${tab.id.split('-')[2]}`);
    tabButtons.forEach(tab => {
        tab.addEventListener('change', () => {
            // Приховати вміст таби, коли неактивна
            
            tabContents.forEach(content => content.style.display = 'none');

            // відобразити вміст таби, коли активна
            if (tab.checked) {
                
                if (activeTabContent) {
                    activeTabContent.style.display = 'block';
                }
            }
        });
    });

    // 
    tabButtons.forEach(tab => {
        if (tab.checked) {
            
            if (activeTabContent) {
                activeTabContent.style.display = 'block';
            }
        }
    });
*/
// Для керування табами
const tabButtons  = document.querySelectorAll('.tab-nav input[type="radio"]');
const tabContents = document.querySelectorAll('.tab-content');

// Керування табами
document.addEventListener('DOMContentLoaded', () => { 
    setupTabListeners(); // керування табами
    initializeTabContents(); // 
 //   displayHistory(); // ініціалізація для таби1
 //   updateEndDateMin(); // ініціалізація для таби1
 //   fetchCountries(); // ініціалізація для таби2
});

// перша таба, калькулятор дат
const resultV = document.getElementById('result');

const date1V = document.getElementById('date1'); 
const date2V = document.getElementById('date2');

let startDate = new Date(date1V.value);  // 
let endDate   = new Date(date2V.value);

//let startDate = convertToUTC(date1V.value);
//let endDate   = convertToUTC(date2V.value);
                

// друга таба, свята з календаріфік
const apiToken      = 'bRhSp75zNJYqrYlhWThMvINrqnpXHi9q';
const countrySelect = document.getElementById('country');
const year          = document.getElementById('year');
const holidaysList  = document.getElementById('holidays-list');
const fetchButton   = document.getElementById('fetchHolidays');

const holidayFilter  = document.getElementById('holidayFilter');
const sortAscButton  = document.getElementById('sortAsc');
const sortDescButton = document.getElementById('sortDesc');

let holidays = []; // Store fetched holidays

// Додаємо решту слухачів подій по табам
   // таба 1
    date1V.addEventListener('change', updateEndDateMin);
    date2V.addEventListener('change', validateDates);

    document.getElementById('btn-plus-week').addEventListener('click', addWeek);
    document.getElementById('btn-plus-month').addEventListener('click', addMonth);
    
    document.getElementById('btn-days').addEventListener('click', () => calculateInterval('днів'));
    document.getElementById('btn-hours').addEventListener('click', () => calculateInterval('годин'));
    document.getElementById('btn-minutes').addEventListener('click', () => calculateInterval('хвилин'));
    document.getElementById('btn-seconds').addEventListener('click', () => calculateInterval('секунд'));
    
    document.getElementById('btn-clear-history').addEventListener('click', clearHistory);

    document.querySelectorAll('.radio-button').forEach(button => { //
        button.addEventListener('click', () => {
            document.querySelectorAll('.radio-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // таба 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
    fetchButton.addEventListener('click', () => {
        const selectedCountry = countrySelect.value;
        const selectedYear = year.value;

        if (selectedCountry && selectedYear) {
            fetchHolidays(selectedCountry, selectedYear);
          
        } else {
            alert('Спершу оберіть країну та рік.');
        }
    });

        // Слухачі подій на кнопки сортування
        sortAscButton.addEventListener('click', () => sortHolidays('asc'));
        sortDescButton.addEventListener('click', () => sortHolidays('desc'));
        holidayFilter.addEventListener('input', filterHolidays);
//});

//// Керування ТАБАМИ >>>
function hideAllTabContents() { 
    tabContents.forEach(content => content.style.display = 'none'); // приховуємо вміст таби
}
function showActiveTabContent(tab) { // відобразити активну табу
    const activeTabContent = document.getElementById(`content-${tab.id.split('-')[2]}`);
    if (activeTabContent) {
        activeTabContent.style.display = 'block'; // відображаємо табу
        // ініціалізуємо таби
           // додаємо ініціалізацію кожної таби
      switch (tab.id) {
        case 'tab-btn-1':
            displayHistory(); // ініціалізація для таби1
            updateEndDateMin(); // ініціалізація для таби1            
            console.log ('керування датами встановлено, історя прочитана');
            break;
        case 'tab-btn-2':
            fetchCountries(); // ініціалізація для таби2
            console.log ('країни отримано');
            break;      
        default:
            break;
      }  
    }
}

function handleTabChange(tab) { // слухач події на зміну таб
    tab.addEventListener('change', () => {
        hideAllTabContents();
        if (tab.checked) {
            showActiveTabContent(tab);
        }
    });
}

function initializeTabContents() { // Ініціалізація відображення таб
    tabButtons.forEach(tab => {
        if (tab.checked) {
            showActiveTabContent(tab);
        }
    });
}

function setupTabListeners() { // асайнимо слухач події до таби
    tabButtons.forEach(tab => handleTabChange(tab));
}
//// Керування ТАБАМИ <<<<

///// >>>>>Tаба 1 >>>>>

function convertToUTC(dateStr) { // конвертуємо дати в формат без урахування часової зони
    const dateObj = new Date(dateStr);
    console.log('convert',dateStr, (new Date(Date.UTC(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate())))); 
    return new Date(Date.UTC(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate()
    ));
}

function updateEndDateMin() { // Сетимо вибір другої дати не раніе від першої, дізейблимо дургу дату поки не задано першу
     startDate = new Date(date1V.value);  //  
    if (date1.value) {
       date2.disabled = false;
       date2.min = date1.value;
    } else {
       date2.disabled = true;
    }
    validateDates()
   
}

function validateDates() { // Додатково перевіряємо умови дат

    endDate   = new Date(date1V.value.toString); // ресетимо дату завершення
    date1.max = date2.value;
    if (date2.value < date1.value) {
        resultV.innerText = 'Дата завершення не може бути раніше за дату початку.';
    }
   
}

function addWeek() { // Пресет тиждень
      console.log ('addWeek', startDate, endDate);
    if (!isNaN(startDate)) {
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        date2V.value  = endDate.toISOString().split('T')[0];
      //date2V.value = endDate.toString();
    }
}

function addMonth() { // Пресет місяць

    if (!isNaN(startDate)) {
        endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1); // насправді це + 1 місяць і один день
        endDate.setDate(endDate.getDate() - 1);
    
       
       date2V.value = endDate.toISOString().split('T')[0];
    }
}


function calculateInterval(unit) { // Головне обчислення інтервалів між датами
    const oneDay = 86400000. // один день в мілісекундах
    const intervalType = document.querySelector('.radio-button.active').getAttribute('data-value');
   
    if (isNaN(startDate) || isNaN(endDate) || endDate < startDate) {
        resultV.innerText = 'Будьласка, введіть дати з .. по ...';
        return;
    }
    //console.log (startDate, endDate); 
    //console.log ('calc interval',endDate - startDate);
   
// Через перехід на літній час іде неправильний підрахунок мілісекунд. Відкидаємо час взагалі
const startDateUTC = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
const endDateUTC   = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
   //const totalDays = (endDate - startDate + oneDay) / oneDay;
const totalDays = Math.floor((endDateUTC - startDateUTC + oneDay) / oneDay);
    let validDays = totalDays;

    if (intervalType === 'будні дні') {
       // validDays = calculateWorkDays(startDate, endDate);
       validDays = calculateWorkDays(startDateUTC, endDateUTC);
    } else if (intervalType === 'вихідні дні') {
       // validDays = calculateWeekends(startDate, endDate);
       validDays = calculateWeekends(startDateUTC, endDateUTC);
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
    resultV.innerText = `В обраному інтервалі дат: ${formattedResult}`;

    saveToHistory(formattedResult, startDateUTC, endDateUTC, intervalType);
    displayHistory();
}

function calculateWorkDays(start, end) { // Обчислення робочих днів
    let count = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) count++;
    }
    return count;
}

function calculateWeekends(start, end) { // Обчислення вихідних днів
    let count = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day === 0 || day === 6) count++;
    }
    return count;
}

    function saveToHistory(result, startDate, endDate, intervalType) { // Збереження історії в LS
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

///// <<<<<Tаба 1 <<<<<

///// >>>>>Tаба 2 >>>>>

//let holidays = []; // Store fetched holidays
let filteredHolidays = []; // Store filtered holidays

function filterHolidays() {
    console.log ('filter', holidays);
    const filterText = holidayFilter.value.toLowerCase();
    const holidaysToFilter = holidaysList.querySelectorAll('.holidayItem'); // Отримуємо всі показані свята
    console.log ('filter 2', holidaysToFilter);
    filteredHolidays = holidays.filter(holiday => 
        holiday.name.toLowerCase().includes(filterText)
    );

    renderHolidays(filteredHolidays); // Render the filtered holidays
}

function sortHolidays(order = 'asc') {
    console.log ('sort', holidays);
    const holidaysToSort = filteredHolidays.length > 0 ? filteredHolidays : holidays; // Sort filtered holidays if any

    holidaysToSort.sort((a, b) => {
        const dateA = new Date(a.date.iso);
        const dateB = new Date(b.date.iso);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    renderHolidays(holidaysToSort); // Render the sorted holidays
}


// Function to render the holidays list
function renderHolidays(holidaysToRender) {
    console.log ('hol to render', holidaysToRender);   
    holidaysList.innerHTML = ''; // Clear previous list
    holidaysToRender.forEach(holiday => {
        const listItem = document.createElement('li');
        listItem.classList.add('holidayItem');
        listItem.textContent = `${holiday.date.iso}: ${holiday.name}`;
        holidaysList.appendChild(listItem);
        
    });
}


async function fetchCountries() { // первинний запит для отримання списку країн
    try {
        // Звернення до API для отримання списку країн
        const response = await fetch(`https://calendarific.com/api/v2/countries?api_key=${apiToken}`);

        // Перевірка на помилку відповіді сервера
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const countries = data.response.countries;

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country['iso-3166']; // 
            option.textContent = country.country_name;
            countrySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Помилка отримання даних з сайту:", error); // Логування помилки
        alert('Не вдалося отримати список країн. Спробуйте пізніше.'); // Повідомлення користувачу
    }
}

async function fetchHolidays(countryCode, year) { // Запит до сервера за списком свят
    holidaysList.innerHTML = ''; // Очищення попереднього списку
    const url = `https://calendarific.com/api/v2/holidays?api_key=${apiToken}&country=${countryCode}&year=${year}&language=uk`;

    try {
        // Звернення до API для отримання списку свят
        const response = await fetch(url);

        // Перевірка на помилку відповіді сервера
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        holidays = data.response.holidays; // кидаємо в глобальний масив

        if (holidays.length === 0) {
            holidaysList.innerHTML = '<li>Не знайдено свят на цей день.</li>';
            //return []; // Повертаємо порожній масив, якщо свята не знайдено
        }
//            holidays.forEach(holiday => {
//                const listItem = document.createElement('li');
//                listItem.textContent = `${holiday.date.iso}: ${holiday.name}`;
//                holidaysList.appendChild(listItem);
//            });
       // return holidays; // Повертаємо масив свят
       renderHolidays(holidays);

    } catch (error) {
        console.error("Error fetching holidays:", error); // Логування помилки
        alert('Не вдалося отримати список свят. Спробуйте пізніше.'); // Повідомлення користувачу
        return []; // Повертаємо порожній масив у випадку помилки
    }
}


    
    
    
    

///// <<<<<Tаба 2 <<<<<
