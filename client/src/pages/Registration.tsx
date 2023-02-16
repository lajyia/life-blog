import React, { FC, useState } from 'react';
import '../styles/Registration.css';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import FormImage from '../images/form-image.png';
import UserForm from '../images/user-form.svg';
import LockForm from '../images/lock-form.svg';
import SlashForm from '../images/slash-form.svg'

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
                                <div className="registration__input">
                                    <img src={UserForm} alt="" />
                                    <Input type="text" placeholder="Login" />
                                </div>
                                <div className="registration__login-error error-form">aaa</div>
                            </div>
                            <div className="registration__password">
                                <div className="registration__input">
                                    <img src={LockForm} alt="" />
                                    <Input placeholder="Password" type="password" />
                                </div>
                                <div className="registration__password-error error-form">password cant'be smaller 8 letters</div>
                            </div>
                            <div className="registration__linkname">
                                <div className="registration__input">
                                    <img className='registration__image-slash' src={SlashForm} alt="" />
                                    <Input placeholder="Linkname" type="linkname" />
                                </div>
                                <div className="registration__linkname-error error-form">aaa</div>
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