import React, { useState, ReactNode } from "react";

type FancyBorderProps = {
    children?: ReactNode
}

function FancyBorder (props: FancyBorderProps) {
    const { children } = props;
    return (
        <div>
            { children }
        </div>
    )
}

type DialogProps = {
    title: String;
    description: String;
    children ?: ReactNode;
}

function SkeletonDialog (props: DialogProps) {
    const {
        title, description, children
    } = props;
    return (
        <FancyBorder>
            <h1> { title } </h1>
            <p> { description } </p>
            { children && children }
        </FancyBorder>
    )
}

// function WelcomeDialog () {
//     return (
//         <SkeletonDialog 
//             title = 'Welcome !'
//             description = 'Thanks for visiting our site :)'
//         />
//     )
// }

function LoginDialog () {
    
    const [value, setValue] = useState('');
    const submitForm = () => { console.log(value) }

    return (
        <SkeletonDialog
            title = ''
            description = ''
        >
            <input type='text' onChange={ e => setValue(e.target.value) } />
            <button onClick={submitForm} > 완료 </button>
        </SkeletonDialog>
    )
}


export default LoginDialog;