// CHAPTER 6: THE SECRET LIFE OF OBJECTS
// object oriented programming is a set of techniques that use objects as the central principle of program organization

// METHODS
// methods are properties that hold function values.

function speak(line) {
  console.log(`the ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("Got any carrots?");

// when a method is called, the binding 'this' in it body points at the object on which it is called.

// we can think of 'this' as an extra parameter that is passed to the function in a different way than regular parameters.

// if we want to provide the object explicitly to point to the the 'this' keyword, we can use the function call method which takes the 'this' value as it first argument and treat other args as normal parameter.

speak.call(whiteRabbit, "Hurry");

speak("Hurry");

// Arrow function do not bind their own 'this' but can see the 'this' binding of the scope around them.

let finder = {
  find(array) {
    return array.some((v) => v == this.value);
  },
  value: 5,
};

console.log(finder.find([4, 5])); // true

// PROTOTYPES
// prototypes are the mechanism by which object inherit features from one another.

let empty = {};

console.log(empty.toString);
console.log(empty.toString());

// toString is a method stored in Object.prototype. It is available to most objects.

// Every object has a built-in property, which is called its PROTOTYPE. this prototype itself are object, so they also have their own prototype, making a PROTOTYPE CHAIN.

// the chain ends when we reach a prototype that has 'null' for its own prototype

// when an object get a request for a property it doesn't have, its prototype will be searched for the property. if that doesn't have it, the prototype's prototype is searched and so on until an object without a prototype is reached.

// therefore Object.prototype is an object.
console.log(Object.getPrototypeOf({}) == Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null

// Object.getPrototypeOf returns the prototype of an object

// Many objects don't directly have Object.prototype as their prototype. Functions derive from Function.prototype and arrays derive from Array.prototype

console.log(Object.getPrototypeOf(Math.max) == Function.prototype); // true

console.log(Object.getPrototypeOf([]) == Array.prototype); // true

// you can use Object.create to create an object with a specific prototype

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};

let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");

console.log(Object.getPrototypeOf(blackRabbit));

// here, the 'protoRabbit' object acts as a container for the properties shared by all rabbits.

// meanwhile, the 'blackRabbit' contains properties that apply only to itself. In this case the type property and derives shared properties from its prototype

// CLASSES
