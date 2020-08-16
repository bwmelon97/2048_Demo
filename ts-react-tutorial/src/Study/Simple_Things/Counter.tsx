/* with useState */
// import React, { useState } from "react";

// function Counter () {

//     const [count, setCount] = useState<number>(0);

//     const onIncrease = (): void => setCount(count + 1);
//     const onDecrease = (): void => setCount(count - 1);

//     return (
//         <div>
//             <h1> {count} </h1>
//             <button onClick={onIncrease} >+</button>
//             <button onClick={onDecrease} >-</button>
//         </div>
//     )
// }

// export default Counter;


/* with useReducer */

import React, {useReducer} from 'react'

type Action = {type: 'INCREASE'} | {type: 'DECREASE'};

function reducer (state: number, action: Action): number {
    switch(action.type) {
        case 'INCREASE':
            return state + 1;

        case 'DECREASE':
            return state - 1;

        default:
            throw new Error('Unexpected Error')
    }
}

function Counter () {

    const [count, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => dispatch({type: 'INCREASE'});
    const onDecrease = () => dispatch({type: 'DECREASE'});

    return (
        <div>
            <h1> {count} </h1>
            <button onClick={onIncrease} >+</button>
            <button onClick={onDecrease} >-</button>
        </div>
    )
}

export default Counter;