import React, { FC, useState, useEffect } from 'react';
import '../styles/Registration.css';
import Button from '../components/UI/Button/Button';
import FormImage from '../images/form-image.png';
import UserForm from '../images/user-form.svg';
import LockForm from '../images/lock-form.svg';
import SlashForm from '../images/slash-form.svg';
import { PostService } from '../API/PostService';


interface validForm {
    password: boolean,
    linkname: boolean,
    login: boolean
}

interface existForm {
    linkname: boolean,
    login: boolean
}


const Registration: FC = () => {

    const [existForm, setExistForm] = useState<existForm>({ linkname: false, login: false })
    const [validForm, setValidForm] = useState<validForm>({ password: true, linkname: true, login: true });

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

        const length: number = e.target.value.length;

        if (length > 7) {
            setValidForm({ ...validForm, password: true })
        }
        else {
            setValidForm({ ...validForm, password: false })
        }
    }


    const changeLogin = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const length = e.target.value.length;

        if (length > 4) {
            setValidForm({ ...validForm, login: true });

            const response = await PostService.checkLogin(e.target.value);

            setExistForm({ ...existForm, login: response.data.message })
        }
        else {
            setValidForm({ ...validForm, login: false })
        }
    }

    const changeLinkname = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const length = e.target.value.length;

        if (length > 4) {
            setValidForm({ ...validForm, linkname: true })

            const response = await PostService.checkLinkname(e.target.value);

            setExistForm({ ...existForm, linkname: response.data.message })
        }
        else {
            setValidForm({ ...validForm, linkname: false })
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
                                    <input onChange={changeLogin} type="text" placeholder="Login" />
                                </div>
                                {!validForm.login
                                    ? <div className="registration__login-error error-valid-form">linkname can't be smaller 5 letters</div>
                                    : <div></div>
                                }
                                {existForm.login
                                    ? <div className="registration__error-exists-form">login busy</div>
                                    : <div></div>
                                }
                            </div>
                            <div className="registration__password">
                                <div className="registration__input">
                                    <img src={LockForm} alt="" />
                                    <input onChange={changePassword} placeholder="Password" type="password" />
                                </div>
                                {!validForm.password
                                    ? <div className="registration__password-error error-valid-form">password cant'be smaller 8 letters</div>
                                    : <div></div>
                                }
                            </div>
                            <div className="registration__linkname">
                                <div className="registration__input">
                                    <img className='registration__image-slash' src={SlashForm} alt="" />
                                    <input onChange={changeLinkname} placeholder="Linkname" type="linkname" />
                                </div>
                                {!validForm.linkname
                                    ? <div className="registration__linkname-error error-valid-form">linkname cant'be smaller 5 letters</div>
                                    : <div></div>
                                }
                                {existForm.linkname
                                    ? <div className="registration__error-exists-form">login busy</div>
                                    : <div></div>
                                }
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