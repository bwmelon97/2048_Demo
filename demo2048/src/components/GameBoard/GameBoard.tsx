import React from 'react'
import styled from 'styled-components';

import { color } from "../../styles/variables";


/* Styled Components */
const Container = styled.div`
    margin-top: 24px;
    padding: 6px;

    background-color: ${color.board}; 

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`;

    const BlockContainer  = styled.div`
        position: relative;
        flex: 25% 1 1;
        padding-top: 25%;

        display: flex;
        align-items: center;
        justify-content: center;
    `;

        const Block = styled.div`
            position: absolute;
            top: 6px;
            bottom: 6px;
            left: 6px;
            right: 6px;

            background-color: ${color.block_inactive};
        `;


/* React Component */
function GameBoard () {
    return (
        <Container>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
            <BlockContainer > 
                <Block />
            </BlockContainer>
        </Container>
    )
}


export default GameBoard;