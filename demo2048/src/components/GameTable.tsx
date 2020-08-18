import React from 'react';
import styled from 'styled-components';

import { useWindowSize } from "../hooks";


/* Styled Components */
const Container = styled.div`
    margin: 0 auto;
    width: 500px;
    min-height: ${(props: {minHeight: number})  => props.minHeight}px;
`;

/* React Component */
function GameTable () {

    const { windowHeight } = useWindowSize();

    return (
        <Container minHeight={windowHeight} >
            hi
        </Container>
    )
}


export default GameTable;