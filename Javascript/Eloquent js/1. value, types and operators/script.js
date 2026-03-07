// INTRODUCTION
// programming is the act of constructing a program
// A program is a set of instructions telling a computer what to do.

// VALUES, TYPES AND OPERATORS
// In a computer, there is only data. You can read, modify and create new data. This data are stored as bits

// Bits are any kind of 2 valued things usually 0s and 1s. inside the computer. They may be high or low electrical charge, strong or weak signal or a shiny or dull spot on CD

// for example, we can express the number 13 in bits
//  0   0  0  0 1 1 0 1
// 128 64 32 16 8 4 2 1

// another example showing 240 in bits
//  1  1   1  1 0 0 0 0
// 128 64 32 16 8 4 2 1

/*
VALUES
=> a modern computer has more than 100 billion bits in its volatile data storage (RAM) and the ROM (hard disk).

=> to be able to work with such amount of bits, we seperate them into chunks that represent pieces of info called values. 


=> all values are made of bit, they play different roles. Every value has a stype that determins its role. some values are numbers, pieces of text, functions etc. 
*/

// => VALUE TYPES

// 1. Numbers

console.log(2.998e8);

// ARITHMETIC
// when operators appears together without parentheses, they are applied in order of precedence.

// the / and * has the same precedence, like + and -, so when they appear together, they are usually applied left to right.

// nevertheless, we shouldn't worry too much about precedence, when in doubt, add parentheses

// % usually called modulo is used to represent remainder operation. X % Y returns the raminder of dividing X by Y. it has same precedence as * and /

console.log(314 % 100); // returns 14
console.log(144 % 12); // returns 0

// SPECIAL NUMBERS
// the 3 special no in js are infinity, -infinity and NaN.

// we should't use inifinity based computation often because it is not mathematically sound and it will often always result to NaN.

// NaN is a value of the type number. We get it when we perform numeric operations that don't yield a meaningful result. example

console.log(0 / 0); // returns NaN
console.log(Infinity - Infinity); // returns NaN

// 2.  STRINGS
// to include special characters like "", newlines(the character we get when we press the ENTER button), tabe etc.

// we first utilize a \(back slash) to indicate that the character after it has a special meaning. This is called escaping the character. when an n occurs after a back slash, it indicates a new line while a t indicate a new tab

console.log("This is the first line\nAnd this is the second");

// when we need to use a back slash in our string, we can use 2 back slash and only one will remain

console.log("A newline character is like like \'\\n\'.");

// => HOW DOES JS STORES STRINGS
// strings are stored as bit in a computer. Js does this based on the Unicode standard. The Unicode standard assigns a number to every character. Even characters from different languages.

// so if we have a number for every character, a string can be described by a sequence of numbers. That's what js does.

// UNARY OPERATORS
// not all unary operators are symbols, some are words.
// example is the 'typeof' operator

console.log(typeof 4.5);
console.log(typeof "Birthday");

// some operators takes 2 values. they are called binary operators. But the operator 'typeof' takes only 1 value, so it is a unary operator.

// the '-' can be used both as a binary and unary operator

console.log(-10 - 2);

// 3. BOOLEAN VALUES
// mainly used to compare. majorly true or false.

// the NaN is the only value in js that is not equal to itself.

console.log(NaN === NaN); // false
// NaN is the result of a nonsensical operation, so it is not supposed to be equal to the result of another nonsensical operation.

// LOGICAL OPERATORS
// used to reason anout boolean values. They are and &&, or || and not ! (unary)

// OPERATORS PRECEDENCE SO FAR
// || < && < comparison operators (>, ==, <= etc) < the rest

console.log(1 + 1 == 2 && 10 * 10 > 50);

// Ternary or conditional operator
// statement ? true : false.

// 4. EMPTY VALUES
// null and undefined are used to represent the absence of a meaningful value. They are values that carry no information.

// many operations that don't produce a meaningful value returns undefined.
// null and undefined are interchangeable.

let a;

console.log(a); // undefined

console.log(null == undefined); // true;

// we can null to test if a value is real.

console.log(null == 0); // false

// SHORT CIRCUITING OF LOGICAL OPERATORS
// the || operator will return the value to its left when that value can convert to true and will return the value to it right otherwise.

console.log(null || "user"); // 'user'
console.log("Agnes" || "user"); // 'Agnes'

// the ?? operator returns the value to the right only if the value on the left returns null or undefined

console.log(0 ?? 100); // 0
console.log(null ?? 100); // 100

// the && operator will return the value to its left when that value convert to false and will return the value to it right otherwise.
