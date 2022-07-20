import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";

type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof RemoveTodoListAC>

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.taskTitle, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.taskIsDone
                } : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.taskTitle
                } : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState

        // alternative:
        // case "REMOVE-TODOLIST":
        //     let {[action.todolistId]: [], ...rest} = {...state}
        //     return rest

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    taskId,
    todolistId
} as const)

export const addTaskAC = (taskTitle: string, todolistId: string) => ({
    type: "ADD-TASK",
    taskTitle,
    todolistId
} as const)

export const changeTaskStatusAC = (taskId: string, taskIsDone: boolean, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    taskIsDone,
    todolistId
} as const)

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE",
    taskId,
    taskTitle,
    todolistId
} as const)