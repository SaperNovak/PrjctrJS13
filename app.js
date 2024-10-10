"use strict";

//1. Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку: 

const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];

let initials =getInitials(userNames);

function getInitials(fullNames) {
  return fullNames.map(name => {
    const words = name.split(' ');
    return words.map(word => word[0]).join('.') + '.';
  }).sort(); // за замовчанням по алфавіту
};

console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]

// 2. Задача на фільтрування масиву
//Реалізуйте фільтрування імен які починаються з голосної двома способами:
//через умовну конструкцію
//через вбудований метод масивів

const userNames2 = ['Петро', 'Емма', 'Юстин', 'Ілля', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];
let filteredNames;

// тут ваш код...
function filterNamesWithIf(names) {
  const letters = ['А', 'Е', 'Є', 'И', 'І', 'Ї', 'О', 'У', 'Ю', 'Я'];
  let filteredNames = [];

  for (let i = 0; i < names.length; i++) {
    if (letters.includes(names[i][0].toUpperCase())) {
      filteredNames.push(names[i]);
    }
  }

  return filteredNames;
}

function filterNamesWithFilter(names) {
  const letters = ['А', 'Е', 'Є', 'И', 'І', 'Ї', 'О', 'У', 'Ю', 'Я'];

  return names.filter(name => letters.includes(name[0].toUpperCase()));
}

//console.log(filteredNames); // ['Емма', 'Юстин', 'Ілля', 'Яна', 'Антон', 'Олена']
console.log (filterNamesWithIf(userNames2));
console.log (filterNamesWithFilter(userNames2));

//3. Задача на розворот числа:
const currentMaxValue = 4589;
let reverseMaxValue;

reverseMaxValue = Number(currentMaxValue.toString().split('').reverse().join('')); // стрінг>масив>розворот>стрінг>число

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number'


//4. Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:
const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

// тут ваш код...


function calculate(arr) {
  return arr.reduce((acc, item) => {
    
    if (Array.isArray(item)) { // якщо масив розпакуваємо ще
      return acc * calculate(item);
    }
    return acc * item;        // число-множимо
  }, 1);                    
}

productOfArray = calculate(resultsArray);

console.log(productOfArray); // 24

