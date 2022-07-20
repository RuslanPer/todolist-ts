import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
    ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof ChangeTodoListTitleAC>

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [...todolists, {id: action.todolistId, title: action.todolistTitle, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, title: action.todolistTitle} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.todolistFilter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (todolistId: string) => ({
    type: "REMOVE-TODOLIST" ,
    todolistId
}as const)
export const AddTodoListAC = (todolistTitle: string) => ({
    type: "ADD-TODOLIST" ,
    todolistTitle,
    todolistId: v1()
}as const)
export const ChangeTodoListTitleAC = (todolistId: string, todolistTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE" ,
    todolistId,
    todolistTitle
}as const)
export const ChangeTodoListFilterAC = (todolistId: string, todolistFilter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER" ,
    todolistId,
    todolistFilter
}as const)