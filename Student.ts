import { Person } from "./Person";

class Student extends Person {
    study = () : string => {
        return `${this.name} is studying!!`;
    }
}

const Soo = new Student('Soo');
console.log(Soo.study());