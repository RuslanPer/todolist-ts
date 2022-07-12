import {FilterValuesType, TodoListType} from "../App";

type ActionType =
    ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | ReturnType<typeof ChangeTodoListTitleAC>

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...todolists, {id: action.id, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string) => ({
    type: "REMOVE-TODOLIST" as const,
    id
})
export const AddTodoListAC = (id: string, title: string) => ({
    type: "ADD-TODOLIST" as const,
    id,
    title
})
export const ChangeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE" as const,
    id,
    title
})
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER" as const,
    id,
    filter
})