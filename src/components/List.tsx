import React, { useState } from 'react';
import { ITodo } from '../interfaces';


type ListProps = {
    todos: ITodo[]
    onToggle: (id: number) => void
    onDelete: (id: number) => void
    onAdd: (title: string) => void
}

export const List: React.FunctionComponent<ListProps> = ({todos, onToggle, onDelete, onAdd}) => {

    const [title, setTitle] = useState<string>('');

    if (todos.length === 0) {
        return (
            <div className="no-tasks">
                <p>no tasks...</p>
            </div>
        );
    }

    const keyEditHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onAdd(title);
            setTitle(title);
        }
    }

    const removeHandler = (event: React.MouseEvent, id: number) => {
        event.preventDefault();
        onDelete(id);
    }

    return (
        <div className="list__container">
            <ul>
                {todos.map(todo => {
                    const classes = ['todo']
                    if (todo.completed) {
                        classes.push('completed')
                    }
                    return (
                    <li key={todo.id} className={classes.join(' ')}>
                        <label 
                            htmlFor="" 
                            onKeyPress={keyEditHandler} 
                            defaultValue={title} 
                            spellCheck="false" 
                            suppressContentEditableWarning={true} 
                            contentEditable
                        >
                            <input 
                                className="checkbox" 
                                type="checkbox" 
                                checked={todo.completed} 
                                onChange={() => onToggle(todo.id)} 
                            />
                            <span>{todo.title}</span>
                            <i 
                                className="fas fa-trash" 
                                onClick={event => removeHandler(event, todo.id)}
                            />
                        </label>
                    </li>
                    );
                })}
            </ul>
        </div>
    );
}