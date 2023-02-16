import React, { FC } from 'react';
import classes from './Button.module.css';

interface buttonProps{
    children?: string,
    onClick?: (e: any) => void
}

const Button:FC<buttonProps> = ({children, ...props}) => {
    return (
        <button {...props} className={classes.button}>
            {children}
        </button>
    );
};

export default Button;