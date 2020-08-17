import { 
    createAction,
    ActionType,
    createReducer
} from 'typesafe-actions';

/* 액션 타입 */
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

/* 액션 생성 함수 
   const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } });
   const createItem = createAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }));
*/
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();

/* 액션들의 타입스크립트 타입 준비 */
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;


/* state를 위한 타입 설정 */
type CounterState = { count: number; }
const initialState: CounterState = { count: 0 }

/* Reducer: object map 방식 
   가독성이 좋음 */
// const counter = createReducer<CounterState, CounterAction>(initialState, {
//     [INCREASE]: state => ({ ...state, count: state.count + 1 }) ,
//     [DECREASE]: state => ({ ...state, count: state.count - 1 }) ,
//     [INCREASE_BY]: (state, action) => ({ ...state, count: state.count + action.payload }) ,
// })

/* Reducer: method chainning 방식
   액션 타입 선언 없이 액션 생성자를 이용할 수 있음. (코드를 줄일 수 있음) */
const counter = createReducer<CounterState, CounterAction> (initialState)
.handleAction(increase, state => ({ ...state, count: state.count + 1 }) )
.handleAction(decrease, state => ({ ...state, count: state.count - 1 }) )
.handleAction(increaseBy, (state, action) => ({ ...state, count: state.count + action.payload }) );

export default counter;