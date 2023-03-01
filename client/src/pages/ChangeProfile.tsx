import React, { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/ChangeProfile.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import DefaultAvatar from '../images/default-avatar.svg'
import Button from '../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import Camera from '../images/camera.svg'


const ChangeProfile: FC = () => {

    const userInfo = useSelector((state: IRootState) => state.user.user);

    const [user, setUser] = useState(userInfo);
    const [choose, setChoose] = useState<boolean>(false);

    const [upload, setUpload] = useState<boolean>(false);

    const pathUser = 'http://localhost:4000/users/' + userInfo.avatar;

    const rootProfileImageClasses = ['change-profile__avatar-form'];

    if (!userInfo.avatar) {
        rootProfileImageClasses.push('default');
    }

    useEffect(() => {
        setUser({ ...userInfo, password: '' });
    }, [userInfo])

    const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, nickname: e.target.value })
    }
    const changeLinkname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, linkName: e.target.value })
    }
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, password: e.target.value })
    }

    const rootProfileBodyAvatarClasses = ['change-profile__body-avatar'];

    const rootImageChooseImage = ['profile-change__image-choose-image'];

    if (choose){
        rootProfileImageClasses.push('choose');
        rootProfileBodyAvatarClasses.push('choose');
        rootImageChooseImage.push('choose');
    }

    const chooseAvatar = () =>{
        setChoose(true);

    }
    const unChooseAvatar = () =>{
        setChoose(false);
    }

    const [urlImage, setUrlImage] = useState<string>();

    const pathImageCreate = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files){
            setUrlImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className='change-profile'>
            <Header />
            <div className="change-profile__body">
                <div className="change-profile__container">
                    <form className='change-profile__form'>
                        <div className="change-profile__top-form">
                            <div className="change-profile__avatar">
                            <label htmlFor="profile-change-file" onMouseOver={chooseAvatar} onMouseOut={unChooseAvatar} className={rootProfileBodyAvatarClasses.join(' ')}>
                                {urlImage
                                    ? <img src={urlImage} alt="" className={rootProfileImageClasses.join(' ')} />
                                    : <img src={userInfo.avatar ? pathUser : DefaultAvatar} alt="" className={rootProfileImageClasses.join(' ')} />
                                }
                                <img className={rootImageChooseImage.join(' ')} src={Camera} alt="" />
                                <input onChange={pathImageCreate} id="profile-change-file" type="file" accept='.jpg, .jpeg, .png,'/>
                            </label>
                            </div>
                            <div className="change-profile__top-info">
                                <div className="change-profile__nickname">
                                    <div className="change-profile__title-nickname">nickname: </div>
                                    <input onChange={changeNickname} value={user.nickname || ''} className='change-profile__nickname-input input-change-profile' type="text" />
                                </div>
                                <div className="change-profile__id-user">ID: {userInfo._id}</div>
                            </div>
                        </div>
                        <div className="change-profile__body-info">
                            <div className="change-profile__linkname">
                                <div className="change-profile__title-linkname">linkname: </div>
                                <input onChange={changeLinkname} value={user.linkName || ''} className='change-profile__linkname-input input-change-profile' type="text" />
                            </div>
                            <div className="change-profile__password">
                                <div className="change-profile__title-password">password: </div>
                                <input onChange={changePassword} value={user.password || ''} className='change-profile__password-input input-change-profile' type="password" />
                            </div>
                        </div>
                        <div className="change-profile__buttons">
                            <Button>Send</Button>
                            <Button>
                                <Link to="/profile">Leave</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangeProfile;