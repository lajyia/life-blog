import React, { FC, useState } from 'react';
import logo from '../images/logo.svg';
import '../styles/Header.css';
import { Link } from 'react-router-dom'
import arrow from '../images/arrow-header.svg';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../store';
import DefaultAvatar from '../images/default-avatar.svg';

const Header: FC = () => {


    const [pathImage, setPathImage] = useState<boolean | string>('')

    const pathUser = 'http://localhost:4000/users/'

    const login = localStorage.getItem('login');

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/feed">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <nav className="header__menu">
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

                {login
                    ?   <div className="header__user-info">
                            <div className="header__user-image">
                                <img className='header__item-image' src={DefaultAvatar} alt="user logo" />
                            </div>
                            <div className="header__user-arrow">
                                <img className='header__arrow-image' src={arrow} alt="arrow" />
                            </div>
                        </div>
                    : <div className='header__unlogin'>
                        <Link to="/login">
                            <div className="header__btn-login">LOGIN</div>
                        </Link>
                    </div>
                }

            </div>
        </header>
    );
};

export default Header;