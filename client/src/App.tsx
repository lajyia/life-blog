import React from 'react';
import Feed from './pages/Feed';
import './styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: '/feed',
      element: <Feed/>
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
