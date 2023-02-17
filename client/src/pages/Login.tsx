import React, { FC } from 'react';
import '../styles/Login.css';
import FormImage from '../images/form-image2.png';
import Button from '../components/UI/Button/Button';
import LockForm from '../images/lock-form.svg';
import UserForm from '../images/user-form.svg';
import Header from '../components/Header';

const Login: FC = () => {
    return (
        <div className='login'>
            <Header/>
            <div className="login__container">
                <div className="login__body-form">
                    <form className="login__form">
                        <div className="login__title-form">LOGIN</div>
                        <div className="login__input login__input-login">
                            <img src={UserForm} alt="" />
                            <input type="text" placeholder="Login" />
                        </div>
                        <div className="login__input login__input-password">
                            <img src={LockForm} alt="" />
                            <input type="password" placeholder='Password' />
                        </div>
                        <Button>Login</Button>
                    </form>
                    <div className="login__image-form">
                        <img className='login__item-image-form' src={FormImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;