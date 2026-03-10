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
// arr[0] + x // returns an error since ts doesn't know if the first item in the array is a number

let arr: number[] = [1, 2, 3];
let strgs: string[] = ["hello", "world", "start", "coding"];
// so when we declare arrays in typescript, we declare what types we want to store inside of that array.

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
  [5, [-4, 1]],
];

xcoords[0][1];
