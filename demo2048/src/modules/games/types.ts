import { ActionType } from 'typesafe-actions';
import * as actions from "./actions";


export const SIZE_OF_BOARD = 4 as const;
export type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';


export type GameAction = ActionType<typeof actions>

export type GameState = {
    board: number[];
    currentScore: number;
    bestScore: number;
}

export const initialState: GameState = {
    board: [],
    currentScore: 0,
    bestScore: 0
}