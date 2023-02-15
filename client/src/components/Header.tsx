import React, { FC } from 'react';
import logo from '../images/logo.svg';
import '../styles/Header.css';
import test from '../images/test.jpg';
import { Link } from 'react-router-dom'
import arrow from '../images/arrow-header.svg';

const Header: FC = () => {
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
                <div className="header__user-info">
                    <div className="header__user-image">
                        <img className='header__item-image' src={test} alt="user logo" />
                    </div>
                    <div className="header__user-arrow">
                        <img className='header__arrow-image' src={arrow} alt="arrow" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;