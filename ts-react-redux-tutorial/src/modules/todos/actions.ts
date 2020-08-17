import { 
    createAction
} from 'typesafe-actions';

/* 액션 타입 */
export const ADD_TODO = 'todos/ADD_TODO'
export const TOGGLE_TODO = 'todos/TOGGLE_TODO'
export const REMOVE_TODO = 'todos/REMOVE_TODO'

/* 액션 생성 함수 */
export const addTodo = createAction(ADD_TODO)<string>();
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();