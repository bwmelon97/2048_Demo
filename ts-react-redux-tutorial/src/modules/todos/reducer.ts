import { createReducer } from "typesafe-actions";
import { TodosState, TodosAction, initialState } from "./types";
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "./actions";

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