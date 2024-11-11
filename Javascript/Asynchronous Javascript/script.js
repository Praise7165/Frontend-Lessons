'use strict';


// ASYNCHRONOUS JAVASCRIPT



// MODULE 1
// Introducing Asynchronous Javascript
// Asynchronous programming is a techniques that enable us run multiple tasks at the same time without waiting for 1 to finish.(concurrently or simulteanously).


// many functions provided by browsers takes a long time and therefore are asynchronous in nature. Example includes
      // Making HTTP requests using fetch();
      // Accessing a user's camera or microphone using getUserMedia()
      // Asking a user to select files using showOpenFilePicker()





// SYNCHRONOUS PROGRAMMING
// Problems With Long Running Synchronous Functions

const personName = 'Miriam';
const greeting = `Hello, my name is ${personName}!`;

console.log(greeting);

// For this code, the browser steps through the program line by line in the order we wrote it. At each point, the browser wait for one line to finish work before moving to the next. 

// Which makes it a synchronous program. It would still be synchronous even if we called a seperate function.



function greetings(name) {
      return `Hello, my name is ${name}`;
}

const greetPerson = greetings(personName);

console.log(greetPerson);

// Here greetings is a synchronous function because the caller has to wait for the function to finish it work and return a value before the caller can continue





// Long Running Synchronous Function.

// The program below uses a very inefficient algorithm to generate multiple large prime numbers.


const MAX_PRIME = 1000000;

function isPrime(n) {
      
      for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
      }

      return n > 1;     
}


console.log(isPrime(21));

// function to generate a random number.
const random = max => Math.floor(Math.random() * max);

// console.log(random(32));


// Function to generate prime numbers

function generatePrimes(quota) {
      const primes = [];

      while(primes.length < quota) {
            const randomNo = random(MAX_PRIME);
            if (isPrime(randomNo)) primes.push(randomNo);
      }

      return primes;
}


// Function to calculate the time taken to generate a prime number.
function calcTimeToGeneratePrimes(quota) {

      const startTime = performance.now();

      // generate prime Numbers.
      generatePrimes(quota);

      const timeTaken = Math.round(performance.now() - startTime);

      return `Finished generating ${quota} prime numbers in ${timeTaken}s`;
}

// console.log(generatePrimes(16));

// console.log(calcTimeTaken(300));



const quota = document.querySelector("#quota");
const output = document.querySelector("#output");

document.querySelector("#generate").addEventListener("click", () => {
  const primes = calcTimeToGeneratePrimes(quota.value);
  output.textContent = `${primes}`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.location.reload();
});



// The Trouble With Long Running Synchronous Functions
// Now adding a textbox for us to type in, we find out that our program is completely unresponsive while our functions are running. We cant type anything, click anything or do anything. 



// The reason for this is because the program follow a single threaded sequence where it can only do one thing at a time. So we will have to wait for our functions to finish running to do something else.


// to make our functions run and return while our program can still respond to other events - we will need to use asynchronous functions.








// EVENT HANDLERS
// Event handlers are a form of async functions, because they receive a function that will be called whenever the event happens. 


const log = document.querySelector('.event-log');

document.querySelector('#xhr').addEventListener('click', () => {
      log.textContent = '';

      const xhr = new XMLHttpRequest();

      // listen for change in the state of object xhr.
      xhr.addEventListener('loadend', () => {
            log.textContent = `${log.textContent} Finished with status: ${xhr.status}`;
      });

      xhr.open(
            'GET',
            'https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json',
      );

      xhr.send();

      log.textContent = `${log.textContent} Started XHR request\n`;
});

document.querySelector('.reload').addEventListener('click', () => {
      log.textContent = '';
      document.location.reload();
});








// CALLBACKS
// A callback is a function that is passed into another function.
// Callbacks used to be the way asynchronous functions were implemented in javascript.


// however the syntax can get hard to understand when the callback has to call functions that accept a call back.

/*
const doStep1 = init => init + 1;
const doStep2 = init => init + 2;
const doStep3 = init => init + 3;


function doOperation() {
      let result = 0;
      result = doStep1(result);
      result = doStep2(result);
      result = doStep3(result);

      console.log(`result: ${result}`);
}

doOperation(); // result = 6;
*/

// here we have an operation that is done in 3 steps where each step depends on the last step. This is a good example of a synchronous programme. But what if we want to make this asynchronous using callbacks



function doStep1(init, callback) {
      const result = init + 1;
      callback(result);
}

function doStep2(init, callback) {
      const result = init + 2;
      callback(result);
}

function doStep3(init, callback) {
      const result = init + 3;
      callback(result);
}

function doOperation() {
      doStep1(0, result1 => {
            doStep2(result1, result2 => {
                  doStep3(result2, result3 => {
                        console.log(`result: ${result3}`);
                  })
            })
      })
}

doOperation();

// because we have callbacks inside callbacks, we get a deeply nested doOperation function which is hard to understand, read and debug. This is called 'Callback hell'. It get very hard to handle error. Therefore for this reason, modern asynchronous APIs dont use callbacks. 





// For example setTimeout function waits a given number of seconds before calling it given function.

setTimeout(() => console.log('Tick'), 500);

// Unlike setTimeout, the setInterval function calls a given function repeatedly after a given seconds
/*
setInterval(() => {
      console.log("God is good");
}, 10000);
*/
// 1s == 1000ms;


// waiting can be useful for updating an animation or checking whether something is taking longer than a given amount of time.