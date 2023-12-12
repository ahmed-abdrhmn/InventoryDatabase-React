import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Headers from './components/Pages/Header.tsx';
import Inventory from './components/Pages/Inventory.tsx';
import Package from './components/Pages/Package.tsx';
import Item from './components/Pages/Item.tsx';
import Branch from './components/Pages/Branch.tsx';

import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'Headers',
        element: <Headers />
      },
      {
        path: 'Inventory',
        element: <Inventory />
      },
      {
        path: 'Packages',
        element: <Package />
      },
      { 
        path: 'Items',
        element: <Item />
      },
      {
        path: 'Branches',
        element: <Branch />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
