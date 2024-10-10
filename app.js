"use strict";

//1. Задача про рекурсію
//Напишіть функцію яка рекурсивно буде знаходити суму всіх непарних додатніх чисел до якогось числа.

function recursiveOddSumTo(n) {
if (n <= 2) {                         // якщо на вході 1 або 2   - сумма непарних 1 
  return 1;
} else {
  if (n <= 0) {                      // (якщо число довільне потрібна ще повернення  0 )
    return 0;
  } else {
   
    return n + recursiveOddSumTo(n-2); // сумуємо з кроком 2 (починаючи з числа 3, бо 2 і менше обробелно верхніми умовами)
  }
   
}  
} 

console.log(recursiveOddSumTo(1)) // 1
console.log(recursiveOddSumTo(9)) // 25


//2. Задача про ітерацію
//Напишіть функцію яка ітеративно (в циклі) буде знаходити суму всіх непарних додатніх чисел до якогось числа.
//Приклад:

function iterativeOddSumTo(n) {
  let res = 0;
  let i = 1;  // починаємо з непарного

  while (i <= n) { 
    res += i;
    i += 2; // сумуємо з кроком 2
  }

  return res;
}

console.log(iterativeOddSumTo(1)) // 1
console.log(iterativeOddSumTo(10)) // 25