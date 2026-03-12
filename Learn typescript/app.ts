// PRIMITIVE TYPE
let x: number = 2; // number
let j: string = "hello world"; //string

let y: boolean = true;

let result: number | undefined = undefined; // this is called a union

result = 3;

// type void - used when we are returning nonthing from a function.
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
