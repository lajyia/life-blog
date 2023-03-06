import React, { FC, useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import '../styles/ChangeProfile.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import DefaultAvatar from '../images/default-avatar.svg'
import Button from '../components/UI/Button/Button';
import { Link } from 'react-router-dom';
import Camera from '../images/camera.svg'
import { UserService } from '../API/UserService';
import { useNavigate } from 'react-router-dom';



const ChangeProfile: FC = () => {


    const inputRef = useRef<HTMLInputElement>(null);

    const userInfo = useSelector((state: IRootState) => state.user.user);

    const [user, setUser] = useState(userInfo);
    const [choose, setChoose] = useState<boolean>(false);


    const [pathImage, setPathImage] = useState('');

    const pathUser = 'http://localhost:4000/users/' + userInfo.avatar;

    const rootProfileImageClasses = ['change-profile__avatar-form'];

    if (!userInfo.avatar) {
        rootProfileImageClasses.push('default');
    }

    useEffect(() => {
        setUser({ ...userInfo, password: '' });
        setPathImage(userInfo.avatar);
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
    const changeBio = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setUser({...user, bio: e.target.value})
    }

    const navigate = useNavigate();

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

    const [image, setImage] = useState<Blob | string>('');

    const pathImageCreate = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files){
            setImage(e.target.files[0]);
            setUrlImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const removeImage = () =>{
        setImage('');
        setUrlImage('');
        setPathImage('');
        if (inputRef.current){
            inputRef.current.value = '';
        }
    }


    const changeProfile = async (e: React.FormEvent<HTMLButtonElement>) =>{

        e.preventDefault();

        const formData = new FormData();


        formData.append('nickname', user.nickname);
        formData.append('password', user.password);

        if (urlImage){
            formData.append('image', image);
        }
        if (!user.avatar && !urlImage){
            formData.append('image', '');
        }
        if (user.avatar && !urlImage){
            formData.append('image', '');
        }

        
        formData.append('bio', user.bio);
        formData.append('linkname', user.linkName);

        const response = await UserService.changeProfile(formData);

        if (response.message === true){
            navigate('/profile');
        }else{
            return alert(response.message)
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
                                    : <img src={pathImage ? pathUser : DefaultAvatar} alt="" className={rootProfileImageClasses.join(' ')} />
                                }
                                <img className={rootImageChooseImage.join(' ')} src={Camera} alt="" />
                                <input ref={inputRef} onChange={pathImageCreate} id="profile-change-file" type="file" accept='.jpg, .jpeg, .png,'/>
                            </label>
                            </div>
                            <div className="change-profile__top-info">
                                <div className="change-profile__nickname input-body">
                                    <div className="change-profile__title-nickname change-profile__title-input">nickname: </div>
                                    <input onChange={changeNickname} value={user.nickname || ''} className='change-profile__nickname-input input-change-profile' type="text" />
                                </div>
                                <div className="change-profile__bio input-body">
                                    <div className="change-profile__title-bio change-profile__title-input">bio: </div>
                                    <input onChange={changeBio} value={user.bio || ''} type="text" className="change-profile__bio-input input-change-profile" />
                                </div>
                            </div>
                        </div>
                        <div className="change-profile__body-info">
                            <div className="change-profile__linkname input-body">
                                <div className="change-profile__title-linkname change-profile__title-input">linkname: </div>
                                <input onChange={changeLinkname} value={user.linkName || ''} className='change-profile__linkname-input input-change-profile' type="text" />
                            </div>
                            <div className="change-profile__password input-body">
                                <div className="change-profile__title-password change-profile__title-input">*password: </div>
                                <input onChange={changePassword} value={user.password || ''} className='change-profile__password-input input-change-profile' type="password" />
                            </div>
                        </div>
                        <div className="change-profile__services-info">
                            <div className="change-profile__warning-password">* If you wont't change password - leave the field blank</div>
                            <div onClick={removeImage} className="change-profile__delete-image-button">Delete image</div>
                        </div>
                        <div className="change-profile__buttons">
                            <Button onClick={changeProfile}>Send</Button>
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