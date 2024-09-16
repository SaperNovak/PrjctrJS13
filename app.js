"use strict";

const button = document.querySelector('.btn'); // Кнопка 
const strDate = document.getElementById('clickDate'); // Рядок з датою останнього кліку 
let lastSwitch = true;
let lastSwitchText = 'On';
let currSwitchText = 'Off';
let lastSDate =  new Date(0);
const initialDate = new Date(0);


const SWITCH_KEY = 'switch'; // Ключ для збереження статусу кнопки в LocalStorage
const SDATE_KEY = 'sdate'; // Ключ для збереження дати в LocalStorage

const colorDark = "#000000";
const colorLight = "#FFFFFF";

//console.log (lastSDate, formattedSDate);
document.addEventListener('DOMContentLoaded', renderButton); // При завантаженні сторінки відображаємо стан кнопки
button.addEventListener('click', clickHandler); // Змінюємо тексти при натисканні на кнопку



function renderButton() {
   // getFromLS(lastSDate, lastSwitch);
   lastSDate = new Date(localStorage.getItem(SDATE_KEY)) ; 
   lastSwitch = JSON.parse(localStorage.getItem(SWITCH_KEY));
   // console.log ('render',lastSDate, lastSwitch);
   // console.log (typeof(lastSwitch))
    switchText(lastSDate, lastSwitch);
    changeColor(lastSwitch);
};


function clickHandler() {

    lastSDate = new Date();
    
    lastSwitch = !lastSwitch 
    changeColor(lastSwitch);
    switchText(lastSDate, lastSwitch)

    settToLS(lastSDate, lastSwitch);
  };

  function switchText(Date, lastSwitch) {
    console.log ('switch', Date, initialDate);
    if ( Date.getTime() 
         === initialDate.getTime()) {
    strDate.innerHTML = '';
    button.innerHTML = 'Turn ' + currSwitchText ;
    } else {
        if (lastSwitch) {
        lastSwitchText = 'On';
        currSwitchText = 'Off';
    } else {
        lastSwitchText = 'Off';
        currSwitchText = 'On';
    };
    strDate.innerHTML = 'Last ' + 'Turn ' + lastSwitchText + ' ' + formatDate(Date);
    button.innerHTML = 'Turn ' + currSwitchText ;
}
};  
// Зберігає результат у LocalStorage
function settToLS(lastSDate, lastSwitch) {
    localStorage.setItem(SDATE_KEY, lastSDate);
    localStorage.setItem(SWITCH_KEY, lastSwitch);
}

// Виводить результат із LocalStorage під час завантаження сторінки
function getFromLS(lastSDate, lastSwitch) {
    lastSDate = localStorage.getItem(SDATE_KEY) ; 
    lastSwitch = localStorage.getItem(SWITCH_KEY);
    console.log ( 'getLS', lastSDate, lastSwitch);
  return (lastSDate, lastSwitch);
  
}

  
  function changeColor(lastSwitch){
    
      if( lastSwitch) {
        document.body.style.background = colorLight;
      } else document.body.style.background = colorDark;
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