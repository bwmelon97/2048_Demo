import { 
    createAction, ActionType, createReducer
} from 'typesafe-actions';

/* 액션 타입 */
const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'
const REMOVE_TODO = 'todos/REMOVE_TODO'

/* 액션 생성 함수 */
export const addTodo = createAction(ADD_TODO)<string>();
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();


/* 액션들의 타입스크립트 타입 준비 */
const actions = {addTodo, toggleTodo, removeTodo};
type TodosAction = ActionType<typeof actions>;


/* state를 위한 타입 설정 */
export type Todo = {
    id: number;
    text: string;
    done: boolean;
}  

type TodosState = { todoList: Todo[]};

/* 초기 state 설정 */
const initialState: TodosState = {
    todoList: [
        { id: 1, text: '타입스크립트 배우기', done: true },
        { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
        { id: 3, text: '투두리스트 만들기', done: false }
    ]
};


/* Reducer */
const todos = createReducer<TodosState, TodosAction> (initialState, {
    [ADD_TODO]: (state, {payload: text}) => {
        const nextId: number = Math.max(0, ...state.todoList.map(todo => todo.id) ) + 1;
        return {
            ...state,
            todoList: state.todoList.concat({
                id: nextId,
                text,
                done: false
            })
        }
    },

    [TOGGLE_TODO]: (state, { payload: id }) => {
        return {
            ...state,
            todoList: state.todoList.map( todo => {
                return todo.id === id ? 
                {...todo, done: !todo.done} : todo;
            })
        }
    },
    
    [REMOVE_TODO]: (state,  {payload: id }) => {
        return {
            ...state,
            todoList: state.todoList.filter( todo => {
                return todo.id !== id
            })
        }
    }
}) 


export default todos;