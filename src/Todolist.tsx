import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTitleHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const tsarChangeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input title={title} setTitle={setTitle} callBack={addTitleHandler}/>
            <Button nameOfButton={'+'} callBack={addTitleHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button nameOfButton={'x'} callBack={onClickHandler}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button nameOfButton={'All'}
                    callBack={() => tsarChangeFilter('all')}/>
            <Button nameOfButton={'Active'}
                    callBack={() =>tsarChangeFilter('active')}/>
            <Button nameOfButton={'Completed'}
                    callBack={() =>tsarChangeFilter('completed')}/>
        </div>
    </div>
}
