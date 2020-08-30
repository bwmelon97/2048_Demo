import { createReducer } from 'typesafe-actions';
import { GameAction, GameState, initialState } from "./types";
import { MOVE_DIRECTION, INITIATE_BOARD } from "./actions";
import { Board } from "./objects";

const boardobj = new Board();

const game = createReducer<GameState, GameAction> (initialState, {
    [MOVE_DIRECTION]: (state, {payload: direction}) => {
        return state;
    },

    [INITIATE_BOARD]: (state) => {
        
        boardobj.initBoard()

        return {
            ...state,
            board: [],
            currentScore: 0,
        };
    }
})


export default game;