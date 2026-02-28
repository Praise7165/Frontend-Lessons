// add data to local storage
localStorage.setItem("myCat", "Tom");

// read data from local storage
const cat = localStorage.getItem("myCat");
console.log(cat);

// remove item from local storage
//localStorage.removeItem("myCat");

// console.log(cat);

// remove all items from local storage
// localStorage.clear();

// local storage only stores string. if we want to store other data types, we have to convert them to strings.

// For arrays and object, we can use JSON.stringify(object or array)
localStorage.setItem(
  "todoList",
  JSON.stringify([
    { pri: "today", action: "Go to school", completed: true, id: "1" },
    { pri: "later", action: "Clean kitchen", completed: false, id: 2 },
    { pri: "today", action: "Wear clothes", completed: false, id: 3 },
    { pri: "later", action: "Cook rice", completed: true, id: 4 },
    { pri: "today", action: "Move back home", completed: false, id: 5 },
    { pri: "today", action: "Learn Javascript", completed: false, id: 9 },
    { pri: "today", action: "Resolve issue at bank", completed: false, id: 8 },
    { pri: "today", action: "Wake up by 4am", completed: false, id: 7 },
    { pri: "later", action: "Visit vegas", completed: false, id: 6 },
  ])
);

localStorage.setItem("user", JSON.stringify({ name: "Alex" }));

console.log(window.localStorage);
const todoList = JSON.parse(localStorage.getItem("todoList"));
console.log(todoList);

console.log(todoList[4].action);
console.log(JSON.parse(localStorage.getItem("user")));

// it is important to note that the retrieved objects or item is a copy of the original sent to the local storage. and changes to it does not affect the one in the local storage.

// RESPONDING TO STORAGE CHANGES
