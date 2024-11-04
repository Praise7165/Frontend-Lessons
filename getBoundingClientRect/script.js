'use strict'



// to assess the bounding client rect of an element and print out its properties.

let elem = document.querySelector('div');


let rect = elem.getBoundingClientRect();


console.log(rect);


for (const key in rect) {
    if (typeof rect[key] !== 'function') {
        let para = document.createElement('p');

        para.textContent = `${key} : ${rect[key]}`;

        document.body.appendChild(para);
    }
}


