import React, { FC } from 'react';
import classes from './Modal.module.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { IRootState } from '../../../store';

interface modalProps{
    children?: React.ReactNode
}


const Modal: FC<modalProps> = ({children}) => {

    const dispatch = useDispatch();
    const visible = useSelector((state: IRootState) => state.visible.visible)

    const rootClasses = [classes.modal]

    if (visible){
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.modal__container}>
                {children}
            </div>
        </div>
    );
};

export default Modal;