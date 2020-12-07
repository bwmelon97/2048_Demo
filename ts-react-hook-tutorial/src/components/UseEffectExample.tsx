import { useState, useEffect } from "react";

type SomeProps = {
    something: any;
}

function UseEffectExample (someProps: SomeProps) {

    useEffect(() => {
        console.log('렌더링')
        return () => {
            console.log('언마운트')
        }
    })

    const [value, setVaule] = useState<String>('');
    useEffect(() => {
        console.log("value is", value);
    }, [value])

    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        console.log('count is ', count);    
    }, [count]);

    return (
        <div>
            <p>{value}</p>
            <input type='text' onChange={(e) => setVaule(e.target.value)} ></input>
        
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)} >+</button>
            <button onClick={() => setCount(count - 1)} >-</button>
        </div>
    )
}


export default UseEffectExample;