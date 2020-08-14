export class Person {
    protected name: string;

    constructor (name: string) {
        this.name = name;
    }

    sayHello = () => {
        return 'my name is ' + this.name;
    }
}

// const park = new Person('Park');
// console.log(park.sayHello()); 