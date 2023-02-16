import React, { FC, useState, useEffect } from 'react';
import '../styles/Registration.css';
import Button from '../components/UI/Button/Button';
import FormImage from '../images/form-image.png';
import UserForm from '../images/user-form.svg';
import LockForm from '../images/lock-form.svg';
import SlashForm from '../images/slash-form.svg'


interface validForm{
    password: boolean,
    linkname: boolean,
    login: boolean
}


const Registration: FC = () => {


    const [validForm, setValidForm] = useState<validForm>({password: false, linkname: false, login: false});

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

        const length: number = e.target.value.length;

        if (length > 7) {
            setValidForm({...validForm, password: true})
        }
    }

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
                                    <input type="text" placeholder="Login" />
                                </div>
                                <div className="registration__login-error error-form">aaa</div>
                            </div>
                            <div className="registration__password">
                                <div className="registration__input">
                                    <img src={LockForm} alt="" />
                                    <input onChange={changePassword} placeholder="Password" type="password" />
                                </div>
                                {!validForm.password
                                    ? <div className="registration__password-error error-form">password cant'be smaller 8 letters</div>
                                    : <div></div>
                                }
                    </div>
                    <div className="registration__linkname">
                        <div className="registration__input">
                            <img className='registration__image-slash' src={SlashForm} alt="" />
                            <input placeholder="Linkname" type="linkname" />
                        </div>
                        <div className="registration__linkname-error error-form">aaa</div>
                    </div>
                    <Button>send</Button>
                </form>
            </div>

        </div>

            </div >
        </div >
    );
};

export default Registration;