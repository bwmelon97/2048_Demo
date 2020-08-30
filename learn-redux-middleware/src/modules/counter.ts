import { createAction, createReducer, ActionType } from 'typesafe-actions';
import { Dispatch } from 'react';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();

export const increaseAsync = () => (dispatch: Dispatch<CounterAction>) => {
    setTimeout(() => {
        dispatch(increase());
    }, 1000);
}

export const decreaseAsync = () => (dispatch: Dispatch<CounterAction>) => {
    setTimeout(() => {
        dispatch(decrease());
    }, 1000);
}

const actions = {increase, decrease};

export type CounterAction = ActionType<typeof actions>;
type CounterState = { count: number };
const initialState: CounterState = { count: 0 };


const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREASE]: state => ({count: state.count + 1}),
    [DECREASE]: state => ({count: state.count - 1})
})

export default counter;