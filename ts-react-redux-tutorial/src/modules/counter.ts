import { 
    createAction,
    ActionType,
    createReducer
} from 'typesafe-actions';


const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();

const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;


type CounterState = { count: number; }
const initialState: CounterState = { count: 0 }

const counter = createReducer<CounterState, CounterAction>(initialState, {
    [INCREASE]: state => ({ ...state, count: state.count + 1 }) ,
    [DECREASE]: state => ({ ...state, count: state.count - 1 }) ,
    [INCREASE_BY]: (state, action) => ({ ...state, count: state.count + action.payload }) ,
})

export default counter;