"use strict";
//1. Задача на селектори
//Для сторінки з вебінару (https://github.com/Niko42na/PRJCTR/blob/webinar10/index.html) напишіть селектори для наступних елементів:  
//— для елементу з текстом 'Навігація по DOM дереву'
const selector1 = document.getElementById('headerTwo');
console.log(selector1);

//— для першого елементу <section>

let selector2 = document.getElementsByTagName('section');
console.log(selector2);

//— для елементу списку з текстом 'Пункт 5'
let selector3 = findElem('Пункт 5');
function findElem(text) {
    let elems = document.querySelectorAll('ul > li')
for (let elem of elems) {
    if (elem.innerHTML == text) {
     return elem;      
    };
};
};
    console.log(selector3);
//— для елементу з класом 'hatredLevelBlock'

let selector4 = document.getElementsByClassName('hatredLevelBlock');
console.log(selector4);

//Кожен селектор має бути унікальним (тобто всі мають бути створені за допомогою різних методів) і має бути присвоєний якійсь змінній.