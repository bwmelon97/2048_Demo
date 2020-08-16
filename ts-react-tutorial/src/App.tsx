import React from 'react';
import Greetings from "./Greetings";

function App() {

    const onClick = (name: string) => console.log(name); 

    return (
        <Greetings 
            name="Soogeun" 
            onClick={onClick}
            // optional='hello world!'    
        />
    );
}

export default App;
