import React, { FC } from 'react';
import classes from './Input.module.css';

interface inputProps{
    placeholder?: string,
    type?: string,
    props?: any
}

const Input: FC<inputProps> = ({placeholder, type, props}) => {
    return (
        <input className={classes.input} placeholder={placeholder} type={type} {...props}/>
    );
};

export default Input;