import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    addTask: (title: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeToDoListTitle: (title: string, todolistID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            const changeTaskTitle = (taskTitle: string) => {
                props.changeTaskTitle(t.id, taskTitle, props.id)
            }
            return (
                <ListItem disableGutters key={t.id} className={t.isDone ? "task isDone" : "task"}>
                    <Checkbox
                        color="primary"
                        onChange={changeTaskStatus}
                        checked={t.isDone}/>

                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Your taskslist is empty</span>

    const createOnClickHandler = (filter: FilterValuesType): () => void  => {
        const onClickHandler = () => props.changeTodoListFilter(filter, props.id)
        return onClickHandler
    }
    const addTask = (title: string) => props.addTask(title, props.id)
    const removeTodolist  = () => props.removeTodolist(props.id)
    const changeToDoListTitle = (todolistTitle: string) => props.changeToDoListTitle(todolistTitle, props.id)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSX}
            </List>
            <div>
                <Button variant="contained"
                        disableElevation
                        size='small'
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={createOnClickHandler("all")}>All</Button>
                <Button variant="contained"
                        disableElevation
                        size='small'
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={createOnClickHandler("active")}>Active</Button>
                <Button variant="contained"
                        disableElevation
                        size='small'
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={createOnClickHandler("completed")}>Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;