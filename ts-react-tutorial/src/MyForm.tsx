import React, { useState } from 'react'

interface MyFormProps {
    onSubmit: (form: Form) => void;
}

export type Form = {
    name: string,
    description: string
}


function MyForm ( {onSubmit}: MyFormProps ) {
    const [form, setForm] = useState<Form>({name:'', description: ''});

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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='name' value={name} onChange={onChange} ></input>
            <input name='description' value={description} onChange={onChange} ></input>
            <button type='submit' >제출</button>
        </form>

    )
}


export default MyForm;