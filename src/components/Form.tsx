import React, { useState } from 'react';

interface FormProps {
    onAdd: (title: string) => void
}

export const Form: React.FunctionComponent<FormProps> = (props) => {
    const [title, setTitle] = useState<string>('');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onAdd(title);
            setTitle('');
        }
    }

    return (
        <div className="form__container">
            <input 
                className="form__input"
                id="title" 
                type="text" 
                placeholder="write task and press Enter" 
                value={title}
                onChange={changeHandler}
                onKeyPress={keyPressHandler}
            />
            <label  className="form__label" htmlFor="title">
                Please, write your task
            </label>
        </div>
    );
}