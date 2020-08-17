import React from 'react'

import { Todo } from "../modules/todos";
import TodoItem from "./TodoItem";


function TodoList () {

    const todos: Todo[] = [
        { id: 1, text: '타입스크립트 배우기', done: true },
        { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
        { id: 3, text: '투두리스트 만들기', done: false }
    ]; 

    if (todos.length === 0) return <p> 등록된 항목이 없습니다. </p>

    return (
        <ul>{
            todos.map( todo => <TodoItem todo={todo} key={todo.id} /> )   
        }</ul>
    )
}


export default TodoList;