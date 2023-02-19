import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Feed from './pages/Feed';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Error from './pages/Error';
import './styles/App.css';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { IRootState } from './store';
import { trueLoginAction } from './store/loginReducer';

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
          </Routes>
          : <Routes>
              <Route path="*" element={<Error />} />
              <Route path="profile" element={<Navigate to="/login" />} />
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route path="feed" element={<Navigate to="/login" />} />
          </Routes>
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
