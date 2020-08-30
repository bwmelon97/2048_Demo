import { createAction } from 'typesafe-actions';
import { Direction } from "./types";

export const MOVE_DIRECTION = 'MOVE_DIRECTION';
export const INITIATE_BOARD = 'INITIATE_BOARD';

export const moveDirection = createAction(MOVE_DIRECTION)<Direction>()
export const initiateBoard = createAction(INITIATE_BOARD)()