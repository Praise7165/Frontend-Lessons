// PRIMITIVE TYPE
let x: number = 2; // number
let j: string = "hello world"; //string

let y: boolean = true;

let result: number | undefined = undefined; // this is called a union

result = 3;

// type void - used when we are returning nothing from a function.
// type never - used when a functions never returns

// ARRAYS AND TUPLES

// let arr = [1, 2, 3, "hello", true];
// arr[0] + x; // returns an error since ts doesn't know if the first item in the array is a number

let arr: number[] = [1, 2, 3];
let strgs: string[] = ["hello", "world", "start", "coding"];
// so when we declare arrays in typescript, we declare what types we want to store inside of that array.

arr[1];
strgs[3];

// we can also do nested arrays

let nestedArr: string[][] = [
  ["hello", " "],
  ["world", " "],
  ["start", " "],
  ["coding", " "],
];

// when we define array, it is best to assign it a type or types that will be inside

let newArr: (number | string)[] = ["hello", 2, 5];

// TUPLES - a fixed length array that has defined values for each position in the array

// let say we have a coordinate x and y and we want to store it in an array

const coord: [number, number] = [100.285, 3450];

coord[1];

// we can combine arrays and tuples

const coords: [number, string][] = [
  [2, "6"],
  [-1, "3"],
  [5, "hello"],
];

coords[0][1];

const xcoords: [number, number[]][] = [
  [2, [1, 7]],
  [-1, [3, 0]],
];

xcoords[0][1];

// LITERAL AND ENUMS
// a literal is a specific value. it is the instance of a primitive type. it can 23 - number literal, 'hello' - string literal, true - boolean literal etc.

let direction: "north" | "south" | "east" | "west";
// literals let us only assigned what is given as the type, it wont let us assign anything else

// direction = "boy"; throws an error

direction = "east";

// another example
let responseCode: 200 | 404 | 201;

responseCode = 404;

// Enums / enumeration - variable names associated with intergers. It may be number, strings etc.

// enums let us map values to variable names. enums are value types.

// we can map the value inside the enum object ourselves or just let the ts engine do it for us.

enum Size {
  Small,
  Medium = 5,
  Large = 15,
}

let size: Size = 0;

size;

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const value = Direction.Left;

// ANY TYPES, UNKNOWN TYPES, TYPE ASSERTIONS & TYPE CASTING

// using 'any' let us ignore type checking for a variable
let z: any = 1;

// we can use 'any' when we are not able to predict what the type of the variable is going to be.

// Even with that, we always want to avoid using 'any' unless we really really have to.

// the 'unknown' type is more safer to use than 'any'. We can use it when we don't know / not sure what the type is going to be. Unlike 'any', 'unknown' forces us to check what the type is before performing an operation.

let i: unknown = 4;

if (typeof i === "number") {
  const result = i + 1;
} else if (typeof i == "string") {
  const result = i.length;
}

// unknown forces us to assert what the type is before we can perform any operation.

// we can also perform a typecast with unknown type, cast is like taking a variable and manually telling the compiler to treat it as a value type.

let newResult = (i as number) + 1;
newResult;

// even with that, it is best to stick with the conditionals when dealing with the unknown type.

// INSTANCES TO USE 'UNKNOWN' OR 'ANY'

// WHEN WE USE ANY
/*
function processFeedback(input: any): void {
  // assume we can perform any operation without explicit type checks
  console.log(`Processing: ${input}`);

  // further processing logic...
}

processFeedback("Great service!");
processFeedback(5);
processFeedback(new Blob());
*/

// WHEN WE USE UNKNOWN
function processFeedback(input: unknown): void {
  // handle string specific logic
  if (typeof input === "string") {
    console.log(`Processing text: ${input}`);
  } else if (typeof input === "number") {
    // handle number specific logic
    console.log(`Processing rating: ${input}`);
  } else if (input instanceof Blob) {
    // handles blob speciifc logic
    console.log(`Processing file`);
  } else {
    console.log(`Unsupported type of input`);
  }
}

processFeedback("Great Service");
processFeedback(5);
processFeedback(new Blob());
processFeedback([1, 2, 3]);

// OPTIONAL CHAINING AND BANGS
// optional chaining operator (?) is useful to use when we have a chaining that can potentially return undefined.

const arrObj = [{ name: "tim" }, { name: "joe" }, { name: "jane" }];

const el = arrObj.pop()?.name;

const nestArrObj = [[{ name: "tim" }]];

// const ele = nestArrObj.pop()?.pop()?.name;

// the opposite of the optional chaining(?) is the bang(!) operator. It forces a chain to be not undefined. this ! (bang) operator ignores the fact that one of our chaining may return undefined.

const ele = nestArrObj.pop()!.pop()!.name;

// it may be problematic as it ignores that our chaining may really be undefined, and it forces tomove forward so as to return something. And as we all know the result of something from undefined may cause our code to carsh or throw an error

// it is bad practise to use the bang(!) operator and the optional chaining operator is sufficient for our needs.

// FUNCTIONS TYPES

function add(x: number, y: number) {
  return x + y;
}

const addResult = add(1, 2);

// putting a ?(optional operator in front of our parameter will give us the option to exclude it - as it can left undefined)

// as like js, we can pass a default parameter to our function by equalling it to want we want the default value to be.
function makeName(
  firstName: string = "Omolade",
  lastName: string,
  middleName?: string,
) {
  return `${firstName + " "}` + `${middleName + " "}` + lastName;
}

const fullName = makeName("Omolade", "Lekan");

function callFunc(
  func: (f: string, l: string, m?: string) => string,
  param1: string,
  param2: string,
) {
  func(param1, param2);
}

console.log(callFunc(makeName, "Tim", "Ruscica"));

function mul(x: number, y: number) {
  return x * y;
}

function div(x: number, y: number) {
  return x / y;
}

function applyFunc(
  funcs: ((a: number, b: number) => number)[],
  values: [number, number][],
): number[] {
  const results: number[] = [];
  for (let i = 0; i < funcs.length; i++) {
    const args = values[i];
    const result = funcs[i](args[0], args[1]);
    results.push(result);
  }

  return results;
}

applyFunc(
  [mul, div],
  [
    [1, 2],
    [4, 5],
  ],
);

// ADVANCED FUNCTION TYPE: REST PARAMETERS AND OVERLOADED FUNCTIONS

// REST PARAMETERS
function sum(...numbers: number[]) {
  let result = 0;
  for (let i = 0; i < [...numbers].length; i++) {
    result = result + i;
  }

  return result;
}

sum(1, 2, 3);
sum();

// OVERLOADED FUNCTION
// a function that has multiple ways it can be called and it accepts different types.

function getItemLength(name: string): number;
function getItemLength(names: string[]): string;
function getItemLength(nameOrNames: unknown): unknown {
  if (typeof nameOrNames === "string") {
    return nameOrNames.length;
  } else if (Array.isArray(nameOrNames)) {
    return "Hello World";
  }
  return 0;
}

getItemLength("Hello");
getItemLength(["Hello", "7", "Marve"]);

// INTERFACES
// Interfaces is a programming structure that allow us to create types on object

interface Person {
  name: string;
  age: number;
  height?: number; // optional
  hello: () => void;
}

// we can also use type to describe the shape of an object

/*
type Person = {
  name: string;
  age: string;
};
*/

// But type is more flexible, it can be used to define other value types

type ID = string | number;
const ID = "marvelous";

// while interface is specifically for describing the shape of an object

const person: Person = {
  name: "Omolade Lekan",
  age: 25,
  hello: function () {
    console.log(this.name + "says hello");
  },
};

// Both works for describing the shape of an object, but a common convention is using interface

person.hello();

// if we want to create an interface that extends from one original interface - that is can still get property and methods of the parent interface

interface Employee extends Person {
  employeeId: number;
  startTime?: string;
  EndTime: string;
}

const worker: Employee = {
  name: "Peter Moshhod",
  age: 27,
  employeeId: 2760,
  EndTime: "7pm",
};

interface Manager extends Employee {
  employees: Person[];
}

const manager: Manager = {
  employees: [worker],
};
