import React from 'react';

type ButtonPropsType={
    nameOfButton:string,
    callBack:()=>void
}

export const Button = (props:ButtonPropsType) => {
    const onClickHandler=()=>{
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.nameOfButton}</button>
    );
};

