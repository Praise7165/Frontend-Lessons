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




/*
// For example setTimeout function waits a given number of seconds before calling it given function.

setTimeout(() => console.log('Tick'), 500);

// Unlike setTimeout, the setInterval function calls a given function repeatedly after a given seconds

setInterval(() => {
      console.log("God is good");
}, 10000);
*/
// 1s == 1000ms;


// waiting can be useful for updating an animation or checking whether something is taking longer than a given amount of time.








// HOW TO USE PROMISES
// Promises are the foundation of asynchronous programming in modern javascript. 

// A promise is an object returned by an asynchronous function. 
// At the time the promise is returned to the caller, the operation often isnt finished, but the promise object provides methods to handle the eventual success or failure of the operation. 




// With a promise based API, the asynchronous function start the operation and returns a promise object. We can then attach handlers to this promise object and the handlers will be executed when the operation has succeeded or failed.





// Using the fetch() API.
// In this example, we'll download the JSON file from https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json, and log some information about it.



// To do this, we will make an HTTP request to the server. In an HTTP request, we send a request message to a remote server and it sends us back a response. 


// In this case, we will send a request to get a JSON file from the server.

/*
const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', );

// We start by calling the fetch API and assign the return value to fetchPromise variable.


console.log(fetchPromise);

// Outputing the fetchPromise variable returns something like: Promise { <state>: "pending" }, which tells us that we have a promise object and it is in a pending state, which means that the fetch operation is still going on.



fetchPromise.then(response => {
      console.log(`Received response: ${response.status}`);
});
// passing a call back(handler) function into the promise then() method. i.e when the fetch operation succeeds, the promise will call our handler function, passing in a response object, which contains the server's response.



console.log('Started request...');
// Logging a message that we have started the request.
*/


// As we can see the 'started request...' message was logged before we receive the response. Fetch() returns while the request is still going on enabling our program to stay responsive. 


// The response shows the 200(status code), meaning that our request succeeded.







// Chaining Promises.
// With the fetch() API, once you get a response object, you need to call another function to get the response data in this case in JSON. So we would call the json() method on the response object. It turns out that json() is also asynchronous in nature. meaning we have to call 2 successive asynchronous functions.


/*
const fetchPromise = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', 
);


fetchPromise.then(response => {
      const jsonPromise = response.json();
      jsonPromise.then(data => {
            console.log(data);
            console.log(data[0]);
            console.log(data[0].name);
      });
});
*/

// As before we add a then() handler to the promise object returned by fetch(). But this time, our handler calls response.json(), and then passes a new then() handler into the promise returned by response.json();



// Instead of calling the second then() inside the handler for the first then(), we can return the promise return by json(), and call the second then() on the return value. This is called promise chaining. which means we can avoid the increasing level of indentation as seen with callback functions.

/*
fetchPromise
      .then(response => response.json())
      .then(data => {
            console.log(data);
            console.log(data[0]);
            console.log(data[0].name);
      });
*/

// Before we move on to the next step, there is one more piece to add. We need to check that the server accepted and was able to handle the request before we try to read it. We will do this by checking the status code in the response and throwing an error if it wasn't 'OK'.
   
/*
const fetchPromise = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', 
);

fetchPromise
      .then(response => {
            if(!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
      })
      .then(data => {
            console.log(data);
      })
*/



// CATCHING ERRORS
// The fetch() API can throw an error for many reasons, for example because there was no network or the URL was malformed in some ways) and we throw an error ourselves if the server returned an error.



// In the last example, we saw that error handling can get difficult with nested callbacks making us handle errors at every nesting level. 


// To handle error, the promise object provide a catch() method just like the then() method. The differences is that callback function passed to then() is called when the async operation succeeds and cllback function passed to catch() is called when the async operation fails.




// If you add catch() to the end of a promise chain, then it will be called when any of the asynchronous function fails. so you can handle the error of several async operations in 1 place.

/*
const fetchPromise = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', 
);


fetchPromise
      .then(response => {
            if (!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(`Could not get products: ${error}`));

*/







// PROMISE TERMINOLOGY


// Promise can be in one of these 3 states:

/*
1. Pending: here the promise has been created and the async operation is yet to succeed or fail. This is the state the promise object is when we call the fetch() function. Here the request is still being made.



2. Fulfilled: the async function has succeeded. When a promise is fulfilled, it then() method is called.



3. Rejected: here the async function has failed. When a promise is rejected, it catch() method is called.


Sometimes we use the term "settled" to cover both fulfilled and rejected. A promise is "resolved" if it is settled.
*/





/*
// COMBINING MULTIPLE PROMISES.
Unlike promise chaining that consist of several async functions that need each one to complete before starting the next one, sometimes we need all the promises to be fulfilled, but they shouldnt depend on each other. 


It is much more efficient to start them all off toegther, then notify us when they have all been fulfilled.


The Promise.all() method takes an array of promises and returns a single promise.


The returned promise is 

1. fulfilled, when and if all the promises in the array are fulfilled. the then() method is called with an array of all the responses, in the order that the promises were passed into all()

2. rejected when and if any of the promises in the array are rejected. In this case the catch() method is called with the error thrown by the promise that rejected.
*/

/*
const fetchPromise1 = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', 
);

const fetchPromise2 = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found', 
);

const fetchPromise3 = fetch(
      'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json', 
);



Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
.then(responses => {
      for(const response of responses) {
            console.log(`${response.url}: ${response.status}`);
      }
}).catch(error => {
      console.error(`Failed to fetch: ${error}`);
});
*/


// Here we make 3 fetch requests to 3 diff urls(server). If they all succeed, we will log the status of the response of each one. if any fail, then we log the failure.


// All the requests was fulfilled apart from the second one which returned 404(not found) instead of 200(ok) because the requested file does not exist. 



/*
// If we for example try the same code but input badly formed url

const fetchPromise1 = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json', 
);

const fetchPromise2 = fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found', 
);


const fetchPromise3 = fetch(
      'bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json', 
);


Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
.then(responses => {
      for(const response of responses) {
            console.log(`${response.url}: ${response.status}`);
      }
})
.catch(error => console.error(`Failed to fetch: ${error}`));


// fetchPromise3 will return an error due to it invalid url.
*/


// Sometimes, you might need any one from the set of promises to be fulfilled and dont matter which one. In that case we will use Promise.any(). 

// Promise.any() works like Promise.all() except that it is fulfilled as soon as any of the promises are fulfilled and rejected as soon as any of the promises are rejected.


const fetchPromise1 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

const fetchPromise2 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);

const fetchPromise3 = fetch(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);


Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
.then(response => {
      console.log(`${response.url}: ${response.status}`);
})
.catch(error => console.error(`Failed to fetch: ${error}`));



// NOTE
// In this case we cant predict which fetch request will complete first. 








// ASYNC and AWAIT
// the "async" keyword gives us a simpler way to work asynchronous code. Adding "async" at the start of a function makes it an async function.


async function myFunction() {
      // this is an async function.
}


// Inside an async function, you can use the "await" keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled at which point the fulfilled value of the promise is treated as a return value or the rejected value is thrown.



// This allow us to write asynchronous code that looks like synchronous code. For example, we could rewrite our fetch example this way.



async function fetchProducts() {
      try {

            // our function should wait for the fetch() call to be settled.
            const response = await fetch(
                  'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            );

            // the fetch() call will either return a response or throw an error.
            if (!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`);
            }


            // Our function will wait for the response.json() call to be settled. It either return the parsed JSON object or throw an error

            const data = await response.json();


            return data;

            // console.log(data[0]);
      } catch (error) {
            console.error(`Could not get products: ${error}`);
      }
}


// fetchProducts();



// while it  behaves like synchronous code, it still returns a promise object, so we cannot interact with with it return value. So to interact with our promise object outside of the async function block. we need to do something like this.



const promise = fetchProducts();

promise
.then(data => console.log(data))
.catch(error => console.error(error));


// Note that we can only use the "await" keyword inside an async function unless your code is in a javascript module.




// We should keep in mind that just like promise chain, "await" forces async operations to be completed in series. This is necessary tho if the result of the next operation depends on the result of the last one. If that's not the case, Promise.all() will be more useful.
