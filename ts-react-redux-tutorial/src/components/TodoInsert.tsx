import React, { useState, ChangeEvent, FormEvent } from "react";


function TodoInsert () {

    const [value, setValue] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue('');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <input 
                onChange={handleChange}
                placeholder='할 일을 입력하세요.'
                value={value}
            />
            <button type='submit' >등록</button>
        </form>
    )
}


export default TodoInsert;