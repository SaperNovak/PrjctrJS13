"use strict";

// 1. Напишіть функцію detonatorTimer(delay) використовуючи setInterval  
//detonatorTimer(7);
// 3
// 2
// 1
// BOOM!

function detonatorTimer(delay) {
    
    let timer = setInterval(() => {
    
    if ( delay > 0){
    console.log(delay);    
    delay--;
    } else {
    console.log('BOOM!');
    clearInterval(timer);
    }
    }, 1000);
        
}

//2. Напишіть функцію detonatorTimer(delay) використовуючи вкладений setTimeout  
//Вона виводить в консоль число кожну секунду, починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'

//detonatorTimer2(3); Викличу цю функцію як зповільнену задачею 5 для послідовного виводу результатів першого та другого зворотних відліків
// 3
// 2
// 1
// BOOM!

function detonatorTimer2(delay) {

    if (delay > 0) {
        console.log(delay);
        setTimeout(() => detonatorTimer2(delay - 1), 1000);
      } else {
         console.log("BOOM!");
      }
}

// 5. Напишіть функцію-декоратор яка вповільнює виконання довільної функції на вказану кількість секунд.

function slower(func, seconds) {
    return function (...args) {
      console.log(`Chill out, you will get your result in ${seconds} seconds`);
      // задамо таймаут у кс-ть секунд * 1000мс для виклику ф-ції "func"
      setTimeout(() => {
        func(...args);
      }, seconds * 1000);
    };
  }
  
  // 
 
  
  // Обгортаємо функцію 'someFunction' в декоратор і задаємо значення вповільнення
  const slowedSomeFunction = slower(detonatorTimer, 5); // виведу другий зворотний відлік з затримкою 8 секунд
  
  slowedSomeFunction(5,5); // delay = 5 for detonatorTimer2

  const slowedSomeFunction2 = slower(detonatorTimer2, 15); // виведу другий зворотний відлік з затримкою 8 секунд
  
  slowedSomeFunction2(3,15); // delay = 3 for detonatorTimer2


// 3. Напишіть об'єкт в якому опишіть свої довільні властивості та довільні методи що ці властивості виводять. 

let me = {
	name: 'Olga',
	gender: 'female',
	job: 'SAP consultant',
    driverLicense: ['A','B'],
	defaultLang: 'ukrainian',
	foreinLang: 'english',
    defaultLangLavel: 'native speaker',
    foreinLangLevel: 'upper-intermediate',
    introduce() {
		console.log(`My name is ${this.name} and I work as ${this.job}`);
	},
	
	describeMySkils(){
		console.log(`I speak ${this.defaultLang} on on level ${this.foreinLangLevel}, but now I'm also speak ${this.foreinLang} on level ${this.foreinLangLevel}`);
	}
}

//me.introduce();
//me.describeMySkils();

// 4. А тепер зробіть всі свої методи з попередньої задачі прив'язаними до контексту свого об'єкту

// Аби вони були захищені від перезапису об'єкту і їх можна було викликати в таймері:
let securedSelfIntroduce = me.introduce.bind(me); 
let securedSelfeDescribe = me.describeMySkils(me);

setTimeout(securedSelfIntroduce, 1000); // виведе коректний результат
setTimeout(securedSelfeDescribe, 1000); // виведе коректний результат

