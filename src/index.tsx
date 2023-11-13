import ReactDOM from 'react-dom/client';
import React from 'react';
import { router } from './Routes';
import { RouterProvider } from 'react-router-dom';
import { StoreContext, store } from './Stores/store';
import 'react-toastify/dist/ReactToastify.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.js';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <RouterProvider router={router} />
        </StoreContext.Provider>
    </React.StrictMode>
);

