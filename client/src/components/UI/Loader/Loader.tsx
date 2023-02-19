import React, { FC } from 'react';
import classes from './Loader.module.css';
import PigFace from '../../../images/pig-face.svg';


const Loader: FC = () => {
    return (
        <div className={classes.loader__body}>
            <div className={classes.loader}>
                <img src={PigFace} alt="" />
            </div>
        </div>

    );
};

export default Loader;