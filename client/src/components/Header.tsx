import React, { FC, useState, useEffect } from 'react';
import logo from '../images/logo.svg';
import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom'
import arrow from '../images/arrow.svg';
import { UserService } from '../API/UserService';
import DefaultAvatar from '../images/default-avatar.svg';
import { falseLoginAction } from '../store/loginReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import LoaderAvatar from './UI/LoaderAvatar/LoaderAvatar';
import { useFetching } from '../hooks/useFetching';
import { addUserAction } from '../store/userReducer';

const Header: FC = () => {

    const dispatch = useDispatch();

    const [pathImage, setPathImage] = useState<boolean | string>('');
    const [nickname, setNickname] = useState<string>('');

    const navigate = useNavigate();

    const [fetchAvatar, avatarLoading, avatarError] = useFetching(async () => {
        const response = await UserService.getProfileByJWT();
        setPathImage(response.candidate.avatar);
        setNickname(response.candidate.nickname);

        dispatch(addUserAction(response.candidate));
    })

    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            fetchAvatar();
        }
    }, [])

    if (!nickname) {
        localStorage.setItem("login", "")
    } else {
        localStorage.setItem("login", 'true')
    }

    const pathUser = 'http://localhost:4000/users/' + pathImage;
    const login = useSelector((state: IRootState) => state.login.login);

    const unlogin = () => {
        dispatch(falseLoginAction());
        localStorage.setItem('login', '');
        localStorage.removeItem("jwt");
        navigate('/login');
    }

    const changeVisible = () => {
        const infoPanel = document.querySelector('.header__info-panel');
        infoPanel?.classList.toggle('active');
    }

    const nullPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/feed">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                {login && nickname
                    ? <nav className="header__menu">
                        <ul className="header__list-menu">
                            <li className="header__item-menu">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li className="header__item-menu">
                                <Link to="/interesting">Interesting</Link>
                            </li>
                            <li className="header__item-menu">
                                <Link to="/feed">feed</Link>
                            </li>
                        </ul>
                    </nav>
                    : <div></div>
                }

                {avatarLoading
                    ? <LoaderAvatar />
                    : <div>
                        {login && nickname
                            ? <div onClick={changeVisible} className="header__user-info">
                                <div className="header__info">
                                    <div className="header__user-image">
                                        {avatarLoading
                                            ? <LoaderAvatar />
                                            : <img className='header__item-image' src={pathImage ? pathUser : DefaultAvatar} alt="user logo" />
                                        }
                                    </div>
                                    <div className="header__user-arrow">
                                        <img className='header__arrow-image' src={arrow} alt="arrow" />
                                    </div>
                                </div>
                                <div onClick={nullPropagation} className="header__info-panel">
                                    <Link className="header__user-nickname" to="/profile">{nickname}</Link>
                                    <div className='header__exit-button' onClick={unlogin}>EXIT</div>
                                </div>
                            </div>
                            : <div className='header__unlogin'>
                                <Link to="/login">
                                    <div className="header__btn-login">LOGIN</div>
                                </Link>
                            </div>
                        }
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;