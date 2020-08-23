import React from 'react'
import styled from 'styled-components';

import { color } from "../../styles/variables";


/* Styled Components */
const Container = styled.div`
    padding-top: 120px;

    display: flex;
    flex-flow: column nowrap;
`;

    const MainBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: space-between;
    `;

        const TitleBox = styled.div`
            font-size: 48px;
            font-weight: bold;
            color: ${color.text_title};
        `;

        const ExtrasContainer = styled.div`
            display: flex;
            flex-flow: column nowrap;
        `;
        
            const ScoreContainer = styled.div`
                display: flex;
                flex-flow: row nowrap;
            `;

                const ScoreBox = styled.div`
                    padding: 12px;
                    margin: 8px;
                    width: 64px;
                
                    background-color: ${color.header_score_box};
                    border-radius: 4px;

                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                `;

                    const ScoreName = styled.div`
                        margin-bottom: 2px;

                        color: ${color.text_header};
                        font-size: 12px;
                    `;

                    const ScoreValue = styled.div`
                        color: ${color.text_title};
                        font-size: 18px;
                        font-weight: bold;
                    `;

            const NewGameButton = styled.div`
                padding: 12px;
                margin: 8px;

                background-color: ${color.header_new_game};
                border-radius: 4px;
                
                color: ${color.text_header};
                font-size: 18px;

                cursor: pointer;

                display: flex;
                align-items: center;
                justify-content: center;
            `;

    const DescriptionBox = styled.div`
        margin-top: 40px;

        color: ${color.text_description};
    `; 


/* React Component */
function GameHeader () {
    return (
        <Container>
            <MainBox>
                <TitleBox> 2048 </TitleBox>
                <ExtrasContainer>
                    <ScoreContainer>
                        <ScoreBox>
                            <ScoreName>Score</ScoreName>
                            <ScoreValue>1000</ScoreValue>
                        </ScoreBox>
                        <ScoreBox>
                            <ScoreName>Best</ScoreName>
                            <ScoreValue>10000</ScoreValue>
                        </ScoreBox>
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