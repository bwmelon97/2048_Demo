import React from 'react'
import styled from 'styled-components';

import { color } from "../../styles/variables";


/* Styled Components */
const Container = styled.div`
    padding-top: 200px;
    height: 200px;

    display: flex;
    flex-flow: column nowrap;
`;

    const MainBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
    `;

        const TitleBox = styled.div`
            
        `;

        const ExtrasContainer = styled.div`
        
        `;
        
            const ScoreContainer = styled.div`
            
            `;

                const ScoreBox = styled.div`
                
                `;

            const NewGameButton = styled.div`
            
            `;

    const DescriptionBox = styled.div`
    
    `; 


/* React Component */
function GameHeader () {
    return (
        <Container>
            <MainBox>
                <TitleBox> 2048 </TitleBox>
                <ExtrasContainer>
                    <ScoreContainer>
                        <ScoreBox></ScoreBox>
                        <ScoreBox></ScoreBox>
                    </ScoreContainer>

                    <NewGameButton> New Game </NewGameButton>
                </ExtrasContainer>
            </MainBox>

            <DescriptionBox>
                키보드 화살표 키를 이용해서 블럭을 이동하세요.
            </DescriptionBox>
        </Container>      
    )
}


export default GameHeader;