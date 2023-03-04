import React, { FC, useState } from 'react';
import '../styles/Login.css';
import FormImage from '../images/form-image2.png';
import Button from '../components/UI/Button/Button';
import LockForm from '../images/lock-form.svg';
import UserForm from '../images/user-form.svg';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { UserService } from '../API/UserService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { trueLoginAction } from '../store/loginReducer';


interface valueFormProps {
    login: string,
    password: string
}


const Login: FC = () => {

    const dispatch = useDispatch();

    const [valueForm, setValueForm] = useState<valueFormProps>({ login: '', password: '' })

    const navigate = useNavigate();

    const loginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {

        if (valueForm.login.length >= 5 && valueForm.login.length <=10 && valueForm.password.length >= 8) {
            e.preventDefault();

            const response = await UserService.login(valueForm.login, valueForm.password);

            if (response.data.message === true) {
                dispatch(trueLoginAction());
                localStorage.setItem("login", 'true');
                localStorage.setItem("jwt", response.data.token);
                navigate('/feed');
            }else{
                alert(response.data.message)
            }

            setValueForm({ login: '', password: '' })
        }else{
            if (valueForm.login.length <5 || valueForm.login.length > 10 ){
               return alert(`Login can't be smaller 5 and more 10 letters`)
            }else{
               return alert(`Password can't be smaller 8 letters`)
            }
        }
    }

    const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueForm({ ...valueForm, login: e.target.value })
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueForm({ ...valueForm, password: e.target.value })
    }


    return (
        <div className='login'>
            <Header />
            <div className="login__container">
                <div className="login__body-form">
                    <form className="login__form">
                        <div className="login__title-form">LOGIN</div>
                        <div className="login__input login__input-login">
                            <img src={UserForm} alt="" />
                            <input value={valueForm.login} onChange={changeLogin} type="text" placeholder="Login" />
                        </div>
                        <div className="login__input login__input-password">
                            <img src={LockForm} alt="" />
                            <input value={valueForm.password} onChange={changePassword} type="password" placeholder='Password' />
                        </div>
                        <div className="login__buttons">
                            <div className="login__registration-body">
                                <Link to="/registration">Registration</Link>
                            </div>
                            <Button onClick={loginUser}>Login</Button>
                        </div>

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