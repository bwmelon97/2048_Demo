import React, { useState } from 'react'
import { useTodosDispatch } from "../contexts/TodoContext";

function TodoForm () {

    const [value, setValue] = useState<string>('');
    const dispatch = useTodosDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setValue(e.target.value);    
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            text: value
        })
        setValue('')
    }

    return (
        <form onSubmit={onSubmit}>
            <input value={value} onChange={handleChange} />
            <button type='submit'>등록</button>
        </form>
    )
}


export default TodoForm;