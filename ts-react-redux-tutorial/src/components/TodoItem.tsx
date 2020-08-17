import React from 'react'

import { useTodos } from "../hooks";
import { Todo } from "../modules/todos";
import './TodoItem.css';


type TodoItemProps = {
    todo: Todo;
}

function TodoItem ({todo}: TodoItemProps) {

    const {
        onToggleTodo,
        onRemoveTodo,
    } = useTodos();

    const { id } = todo;

    return (
        <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
            <span className="text" onClick={() => onToggleTodo(id)} >{todo.text}</span>
            <span className="remove" onClick={() => onRemoveTodo(id)} >(X)</span>
        </li>
    );    
}


export default TodoItem;