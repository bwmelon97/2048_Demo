import React from 'react'
import { useCounter } from "../hooks";

function Counter() {

    const { count, onIncrease, onDecrease } = useCounter();

    return (
        <div>
            <h1> {count} </h1>
            <button onClick={onIncrease} >+1</button>
            <button onClick={onDecrease} >-1</button>
        </div>
    )
}

export default Counter;