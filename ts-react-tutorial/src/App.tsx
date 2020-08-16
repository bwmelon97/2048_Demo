import React from 'react';
import Greetings from "./Greetings";
import Counter from "./Counter";
import MyForm, {Form} from "./MyForm";

function App() {

    const onClick = (name: string) => console.log(name); 
    const onSubmit = (form: Form) => console.log(form);

    return (
        <div>
            <Greetings 
                name="Soogeun" 
                onClick={onClick}
                // optional='hello world!'    
            />

            <Counter/>

            <MyForm onSubmit={onSubmit} />
        </div>
    );
}

export default App;
