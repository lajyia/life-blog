import React, { FC } from 'react';
import '../styles/Registration.css';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import FormImage from '../images/form-image.png';

const Registration: FC = () => {
    return (
        <div className='registration'>
            <div className="registration__container">
                <div className="registration__body">
                    <div className="registration__form-body">
                        <div className="registration__form-panel">
                            <img src={FormImage} alt="form-image" />
                        </div>
                        <form className="registration__form">
                            <div className="registration__title">REGISTRATION</div>
                            <div className="registration__login">
                                <Input type="text" placeholder="login" />
                            </div>
                            <div className="registration__password">
                                <Input placeholder="password" type="password" />
                            </div>
                            <div className="registration__linkname">
                                <Input placeholder="linkname" type="linkname" />
                            </div>
                            <Button>send</Button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Registration;