import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from './ToDoList.module.css'
import {CheckBox} from "./components/CheckBox";

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
    addTask: (title: string) => void
    changeCheckBox: (id: string, value: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");

        }else setError('Title is required')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onClickHandler = (id: string) => {
        props.removeTask(id)
    }

    const changeCheckBoxHandler = (id: string, eventValue: boolean) => {
        props.changeCheckBox(id, eventValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? style.error : ''} value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? style.isDone : ''}>
                        <CheckBox checked={t.isDone} callBack={(eventValue) => changeCheckBoxHandler(t.id, eventValue)}/>
                        <span>{t.title}</span>
                        <button onClick={ () => onClickHandler(t.id) }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? style.activeFilter : ''}
                    onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? style.activeFilter : ''}
                    onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? style.activeFilter : ''}
                    onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
