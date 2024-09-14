"use strict";

const button = document.querySelector('.btn'); // Кнопка 
const strDate = document.getElementById('clickDate'); // Рядок з датою останнього кліку 
let lastSwitch = true;
let lastSwitchText = 'On';
let lastSDate =  new Date();
let formattedSDate = formatDate(lastSDate);

const SWITCH_KEY = 'switch'; // Ключ для збереження статусу кнопки в LocalStorage
const SDATE_KEY = 'sdate'; // Ключ для збереження дати в LocalStorage

const colorDark = "#000000";
const colorLight = "#FFFFFF";

//console.log (lastSDate, formattedSDate);
document.addEventListener('DOMContentLoaded', renderButton); // При завантаженні сторінки відображаємо стан кнопки
button.addEventListener('click', clickHandler); // Змінюємо тексти при натисканні на кнопку



function renderButton() {
    getFromLS(lastSDate, lastSwitch);
    changeColor(lastSwitch);
}

function clickHandler() {
    lastSDate = new Date();
    formattedSDate = formatDate(lastSDate);
    strDate.innerHTML = 'Last ' + 'Turn ' + lastSwitchText + ' ' + formattedSDate;
    
    changeColor(lastSwitch);
    console.log (lastSDate, formattedSDate);
    lastSwitch = !lastSwitch 
    if (lastSwitch) {
        lastSwitchText = 'On'
    } else {
        lastSwitchText = 'Off'
    };
    button.innerHTML = 'Turn ' + lastSwitchText ;
    settToLS(lastSDate, lastSwitch);
  };

// Зберігає результат у LocalStorage
function settToLS(lastSDate, lastSwitch) {
    localStorage.setItem(SDATE_KEY, lastSDate);
    localStorage.setItem(SWITCH_KEY, lastSwitch);
}

// Виводить результат із LocalStorage під час завантаження сторінки
function getFromLS(lastSDate, lastSwitch) {
    lastSDate = localStorage.getItem(SDATE_KEY, lastSDate) ?? ''; // Встановлюємо 0, якщо результату немає
    localStorage.getItem(SWITCH_KEY, lastSwitch);
}

  
  
  
  function changeColor(lastSwitch){
    
      if( lastSwitch) {
        document.body.style.background = colorDark;
      } else document.body.style.background = colorLight;
  };  

  function formatDate(date) {
    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // форматування
    year = year.toString().slice(-2);
    month = month < 10 ? '0' + month : month;
    dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
      return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}:${seconds}`
    
  };