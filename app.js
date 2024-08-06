"use strict";

/*
Напишіть код який виводить в консоль значення від 1 до 100, 
але замість чисел кратних 3 має виводитись `Лол`, замість значень кратних 5 - `Кек`, 
а замість значень кратних і 3, і 5 - `ЛолКек
*/
const RandVal = Math.trunc(Math.random() * 100);
//console.log(RandVal); 

switch (true) {
    case !!!(RandVal % 15):
        console.log("ЛолКек");
    break;
    case !!!(RandVal % 3):
        console.log("Лол");
    break;
    case !!!(RandVal % 5):
        console.log("Кек");
    break;
    default:
        console.log(RandVal); 
};

/*
Напишіть код який бере значення зі змінної (`value`) і виводить у консоль всі парні числа, що менші за задане.
Наприклад, якщо у змінній число 10, програма має вивести наступне: 2, 4, 6, 8. 
Додаткові вимоги:
1. Реалізуйте рішення 2 способами: з використанням циклу `for` та `while`
2. Код має перевіряти, чи значення у змінній є числом. Якщо воно не є числом,  
в консоль має вивестись повідомлення про помилку, наприклад `'Таке чуство шо Бог десь наказує нас за шось'`.
*/

const Value = prompt("Enter number");
const isEven = n => !!!(n % 2); // Перевірка парності


if (Boolean(+Value)) {
// For
     for (let i = 1; i <= +Value; i++) {
          if (isEven(i) )  {
              console.log(i);
          }
         // else {
         // continue;  
         // }
     } //for
// while
let k = 1;
 while (k <= +Value) {
    
    if (isEven(k) )  {
        console.log(k);
    }
   k++;
 }

}  // (Boolean(+Value)) 
else { //(Boolean(+Value)) 
       console.log("Яка прикра несподіванка спіткала наших на самому старті :(");
     } // else (Boolean(+Value)) 

