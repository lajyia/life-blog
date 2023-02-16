import React from 'react';
import Feed from './pages/Feed';
import Registration from './pages/Registration';
import Login from './pages/Login';
import './styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: '/feed',
      element: <Feed/>
    },
    {
      path: '/registration',
      element: <Registration/>
    },
    {
      path: '/',
      element: <Navigate to="feed"/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
