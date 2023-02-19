import React, { FC } from 'react';
import PigNose from '../images/pig-nose.svg';
import '../styles/Error.css';
import Header from '../components/Header';

const Error: FC = () => {
    return (
        <div className='error'>
            <Header />
            <div className="error__container">
                <div className="error__body">
                    <div className="error__image">
                        <img src={PigNose} alt="" />
                    </div>
                    <div className="error__text-body">
                        <div className="error__title">Page Not Found</div>
                        <div className="error__text">Error 404</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;