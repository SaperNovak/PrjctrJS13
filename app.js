"use strict";
// 1. Напишіть функцію addThemAll
// Вона буде знаходити суму усіх своїх аргументів незалежно від їх кількості (але без використання вбудованого об'єкту Math).
// Використайте оператор розширення

console.log(addThemAll(2,4)); // 6
console.log(addThemAll(1,2,3,4)); // 10
console.log(addThemAll(5,5,10)); // 20

function addThemAll(...operands) {
   
        let sum = 0;
        for (let operand of operands) sum += operand; 
        return sum;
}

// 2. Задача на використання замикання. 
// Напишіть функцію яка працює таким чином: multiply(a)(b)  // a * b

console.log(multiply(5)(5))		// 25
console.log(multiply(2)(-2))	        // -4
console.log(multiply(4)(3))		// 12

function multiply(a) {
   return function (b) {
          return a * b;
         };
}
// 3. Напишіть функцію яка буде використовуватись для сортування масиву фільмів 
// Функція буде приймати два аргумента:
// — властивість за якою треба посортувати. 
// — опцію напрямку сортування (зростання чи спадання)
const movies = [
	{
		movieName: 'The Thing',
		releaseYear: 1982,
		directedBy: 'Carpenter',
		runningTimeInMinutes: 109,
	},
	{
		movieName: 'Aliens',
		releaseYear: 1986,
		directedBy: 'Cameron',
		runningTimeInMinutes: 137,
	},
	{
		movieName: 'Men in Black',
		releaseYear: 1997,
		directedBy: 'Sonnenfeld',
		runningTimeInMinutes: 98,
	},
	{
		movieName: 'Predator',
		releaseYear: 1987,
		directedBy: 'McTiernan',
		runningTimeInMinutes: 107,
	},
];

//console.log(movies.sort(byProperty('releaseYear', '>'))); 
// виведе масив фільмів посортованих по року випуску, від старішого до новішого
//console.log(movies.sort(byProperty('runningTimeInMinutes', '<'))); 
// виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
//console.log(movies.sort(byProperty('movieName', '>'))); 
// виведе масив фільмів посортованих по назві, в алфавітному порядку

function byProperty(property, direction) {
       // const propA = a[property]toUpperCase(); 
   // const propB = b[property]toUpperCase(); 
          switch (direction) {
            case '<': //   за зростанням
                 return (a,b) => a[property] < b[property]  ? -1 : 1  ;
            break;
            case '>': //  за спаданням
                return (a,b) => a[property] > b[property]  ? -1 : 1    ;          
             break;
                 
               };    

          
           };
// sort змфнює сам масив, щоб лишити масив незмінним можна зробити так
const sorted1 = [...movies].sort(byProperty('releaseYear', '>')); // sorted1 = поверхнева копія масиву movies
console.log(sorted1);
const sorted2 = [...movies].sort(byProperty('runningTimeInMinutes', '<'));
console.log(sorted2);
const sorted3 = [...movies].sort(byProperty('movieName', '>'));
console.log(sorted3);

// 4. Напишіть функцію яка відфільтрує масив унікальних значень
//Рішення має працювати незалежно від конкретних значень в масиві імен      

const userNames = ['Петро', 'Емма', 'Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена', 'Емма'];

function filterUnique(array) {
// тут ваш код 
return Array.from(new Set(userNames))
}

console.log(filterUnique(userNames)); // ['Петро', 'Емма', 'Марта', 'Яна', 'Василь', 'Антон', 'Олена'];



