import React from 'react'

import { useTodos } from "../hooks";
import TodoItem from "./TodoItem";


function TodoList () {

    const { todoList } = useTodos();

    if (todoList.length === 0) return <p> 등록된 항목이 없습니다. </p>

    return (
        <ul>{
            todoList.map( todo => <TodoItem todo={todo} key={todo.id} /> )   
        }</ul>
    )
}


export default TodoList;