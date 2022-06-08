import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    title: string
    setTitle: (title: string) => void
    callBack: ()=>void
}

export const Input = (props:InputPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack();
        }
    }
    return (
        <input value={props.title}
               onChange={ onChangeHandler }
               onKeyDown={ onKeyPressHandler }
        />
    );
};
