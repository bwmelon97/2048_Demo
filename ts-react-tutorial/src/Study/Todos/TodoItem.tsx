import React from 'react'
import './TodoItem.css';
import { useTodosDispatch } from "../contexts/TodoContext";

interface TodoItemProps {
    todo: {
        id: number;
        text: string;
        done: boolean;
    }
}

function TodoItem ({ todo }: TodoItemProps) {
    
    const dispatch = useTodosDispatch();
    
    const onToggle = ():void => {
        dispatch({
            type: 'TOGGLE',
            id: todo.id
        })
    }

    const onRemove = ():void => {
        dispatch({
            type: 'REMOVE',
            id: todo.id
        })
    }

    return (
        <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
            <span className="text" onClick={onToggle} >{todo.text}</span>
            <span className="remove" onClick={onRemove} >(X)</span>
        </li>
    )
}

export default TodoItem