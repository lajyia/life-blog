import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from './pages/Feed';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserInfo from './pages/UserInfo';
import Error from './pages/Error';
import './styles/App.css';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { IRootState } from './store';
import { trueLoginAction } from './store/loginReducer';
import ChangeProfile from './pages/ChangeProfile';
import CreatePost from './pages/CreatePost';
import ChangePost from './pages/ChangePost';
import Post from './pages/Post';

function App() {

  const loginLocal = localStorage.getItem("login");

  const dispatch = useDispatch();

  if (loginLocal) {
    dispatch(trueLoginAction());
  }

  const login = useSelector((state: IRootState) => state.login.login);

  return (
    <div className="App">
      <BrowserRouter>
        {login
          ? <Routes>
              <Route path="*" element={<Error />} />
              <Route path="profile" element={<Profile />} />
              <Route path='/' element={<Navigate to="/feed" />} />
              <Route path="login" element={<Navigate to="/feed" />} />
              <Route path="registration" element={<Navigate to="/feed" />} />
              <Route path="feed" element={<Feed />} />
              <Route path="user/:id" element={<UserInfo/>}/>
              <Route path="change" element={<ChangeProfile/>}/>
              <Route path="post/create" element={<CreatePost/>}/>
              <Route path="post/:id" element={<Post/>}/>
              <Route path="post/:id/change" element={<ChangePost/>}/>
          </Routes>
          : <Routes>
              <Route path="*" element={<Error />} />
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
