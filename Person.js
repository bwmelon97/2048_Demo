"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(name) {
        this.sayHello = () => {
            return 'my name is ' + this.name;
        };
        this.name = name;
    }
}
exports.Person = Person;
// const park = new Person('Park');
// console.log(park.sayHello()); 
