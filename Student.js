"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
class Student extends Person_1.Person {
    constructor() {
        super(...arguments);
        this.study = () => {
            return `${this.name} is studying!!`;
        };
    }
}
const Soo = new Student('Soo');
console.log(Soo.study());
