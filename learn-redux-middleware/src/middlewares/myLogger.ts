import { CounterAction } from "../modules/counter";
// import { Store, MiddlewareAPI } from 'redux';


const myLogger = (store: any) => (next: any) => (action: CounterAction) => {
    console.log(action);
    const result = next(action);

    console.log('\t', store.getState());

    return result;
}


export default myLogger