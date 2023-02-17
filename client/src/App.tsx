import React from 'react';
import Feed from './pages/Feed';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles/App.css';
import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="profile" element={<Profile/>}/>
          <Route path='/' element={<Navigate to="feed" />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
