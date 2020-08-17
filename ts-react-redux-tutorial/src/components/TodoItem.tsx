import React from 'react'

import { Todo } from "../modules/todos";
import './TodoItem.css';


type TodoItemProps = {
    todo: Todo;
}

function TodoItem ({todo}: TodoItemProps) {

    return (
        <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
            <span className="text">{todo.text}</span>
            <span className="remove">(X)</span>
        </li>
    );    
}


export default TodoItem;