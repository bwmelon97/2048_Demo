import React, { useState } from "react";

interface CounterProps {

}

type Todo = {
    id: number;
    text: string;
    done: boolean;
}

function Counter () {

    const [count, setCount] = useState<number>(0);
    
    const onIncrease = (): void => setCount(count + 1);
    const onDecrease = (): void => setCount(count - 1);

    return (
        <div>
            <h1> {count} </h1>
            <button onClick={onIncrease} >+</button>
            <button onClick={onDecrease} >-</button>
        </div>
    )
}

export default Counter;