'use strict';

// Основи роботи з DOM (2)

// const settings = {
//     backgroundColor: '#fff',
//     color: '#111',
//     theme: 'light'
// };

// localStorage.setItem('settings', JSON.stringify(settings));

// console.log(localStorage.getItem('settings'));


// кастомні атрибути

// let bar = document.querySelector('#main');
// console.log(bar.dataset);

// основні властивості

// let textElement = document.querySelector('.text');
// textElement.hidden = true;
// divElement.outerHTML = '<section>Новий чудовий елемент</section>'; 


// console.log(divElement.nodeValue);

// elem.textContent = 'Щось нове';


// події

// let redBtn = document.querySelector('.redBtn'); // знаходимо кнопку
// let counter = localStorage.getItem('russophobiaLevel') || 0; // пробуємо взяти значен з локалСтораджа або ж присвоюємо нуль
// let hatredLevel = document.querySelector('.hatredLevelCounter'); // знаходимо каунтер
// hatredLevel.textContent = counter + '👿'; // присвоюємо значення текст контенту каунтера 

// function updateAndShowRussophobiaLevel(event) { // оголошуємо функцію
// 	counter++; // збільшуємо наш каунтер
//     console.log(`Current russophobia level: ${counter}`);
//     console.log(`It is not high enough! 👿`);
//     localStorage.setItem('russophobiaLevel', counter); // записуємо в локал сторадж
//     hatredLevel.textContent = counter+'👿'; // присвоюємо значення текст контенту каунтера
// }

// redBtn.addEventListener('click',updateAndShowRussophobiaLevel);


// let link = document.querySelector('a');

// link.addEventListener('click',function(event) {
//     console.log('clicked');
//     event.preventDefault();
// });

// let redBtn = document.querySelector('.redBtn');

// redBtn.addEventListener('click', function(event) {
//     console.log(`It is not high enough! 👿`);
//     event.stopPropagation();
// });

// document.body.addEventListener('click',function(event) {
//     console.log('The body was clicked!');
//     console.log(`It is not high enough! 👿`);
// });


// let redBtn = document.querySelector('.redBtn');
// redBtn.onclick = function() {
//     console.log(this.nodeName); 
// };


// dispatchEvent

// let btn = document.querySelector('.redBtn');

// btn.addEventListener('click', function (event) {
//     console.log('Mouse Clicked');
//     console.log('event is Trusted -->', event.isTrusted);
// });

// let clickEvent = new Event('click');
// btn.dispatchEvent(clickEvent);


// кастомні події

function highlight(elem) {
    const bgColor = 'blue';
    elem.style.backgroundColor = bgColor;

    // create the event
    let event = new CustomEvent('highlight', {
        detail: {
            backgroundColor: bgColor
        }
    });
    // dispatch the event
    elem.dispatchEvent(event);
}

// Select the button element
let redBtn = document.querySelector('.redBtn');

// Add border style
function addBorder(elem) {
    elem.style.border = "solid 1px red";
}

// Listen to the highlight event
redBtn.addEventListener('highlight', function (e) {
    addBorder(this);

    // examine the background
    console.log(e.detail);
});

// highlight redBtn element
highlight(redBtn);