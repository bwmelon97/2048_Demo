import React, { useState, useRef } from 'react'

interface MyFormProps {
    onSubmit: (form: Form) => void;
}

export type Form = {
    name: string,
    description: string
}


function MyForm ( {onSubmit}: MyFormProps ) {
    const [form, setForm] = useState<Form>({name:'', description: ''});
    const inputRef = useRef<HTMLInputElement>(null)

    const {name, description} = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '', description: '' })
        if (!inputRef.current) { return }
        inputRef.current.focus();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='name' value={name} onChange={onChange} ref={inputRef} ></input>
            <input name='description' value={description} onChange={onChange} ></input>
            <button type='submit' >제출</button>
        </form>

    )
}


export default MyForm;