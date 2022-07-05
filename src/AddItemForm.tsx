import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm:FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const onKeyDownAddItem = (e: KeyboardEvent <HTMLInputElement>) => e.key === "Enter" && onClickAddItem()

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                label={'Title'}
                error={error}
                helperText={error && "Title is required"}/>
            <IconButton onClick={onClickAddItem}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}

export default AddItemForm;