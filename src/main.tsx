import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Headers from './components/Pages/Header.tsx';
import Inventory from './components/Pages/Inventory.tsx';
import Package from './components/Pages/Package.tsx';
import Item from './components/Pages/Item.tsx';
import Branch from './components/Pages/Branch.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'

//Setting up all the routes that will be used in this application
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

//React Query

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
