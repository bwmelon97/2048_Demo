import React, { ReactNode } from "react";

type FancyBorderProps = {
    children: ReactNode
}

function FancyBorder (props: FancyBorderProps) {
    const { children } = props;
    return (
        <div>
            { children }
        </div>
    )
}

function WelcomeDialog () {
    return (
        <FancyBorder>
            <h1> Welcome ! </h1>
            <p> Thanks for visiting our site :) </p>
        </FancyBorder>
    )
}

export default WelcomeDialog;