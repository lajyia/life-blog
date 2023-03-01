import React, { FC } from 'react';
import classes from './Button.module.css';

interface buttonProps{
    children?: any,
    onClick?: (e: any) => void
}

const Button:FC<buttonProps> = ({children, ...props}) => {
    return (
        <button role="button" {...props} className={classes.button}>
            <span>{children}</span>
        </button>
    );
};

export default Button;