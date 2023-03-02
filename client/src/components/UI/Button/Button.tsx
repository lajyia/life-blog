import React, { FC } from 'react';
import classes from './Button.module.css';

interface buttonProps{
    children?: any,
    onClick?: (e: any) => void,
    disabled?: boolean
}

const Button:FC<buttonProps> = ({children, ...props}) => {
    return (
        <button {...props} className={classes.button}>
            <span>{children}</span>
        </button>
    );
};

export default Button;