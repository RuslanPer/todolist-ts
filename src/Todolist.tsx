import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState('');

    const addTackHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if( event.key === 'Enter') {
            addTackHandler()
        }
    }

    const tsarChangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            <Button name={'+'} callBack={addTackHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button name={'All'}
                    callBack={() => tsarChangeFilterHandler('all')}/>
            <Button name={'Active'}
                    callBack={() => tsarChangeFilterHandler('active')}/>
            <Button name={'Completed'}
                    callBack={() => tsarChangeFilterHandler('completed')}/>
        </div>
    </div>
}
