import React from 'react';
import styled from 'styled-components';

import { useWindowSize } from "../hooks";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
import GameFooter from "./GameFooter";


/* Styled Components */
const Container = styled.div`
    margin: 0 auto;
    width: 500px;
    min-height: ${(props: {minHeight: number})  => props.minHeight}px;

    display: flex;
    flex-flow: column nowrap;
`;

/* React Component */
function GameTable () {

    const { windowHeight } = useWindowSize();

    return (
        <Container minHeight={windowHeight} >
            <GameHeader />
            <GameBoard />
            <GameFooter />
        </Container>
    )
}


export default GameTable;