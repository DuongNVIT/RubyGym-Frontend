import React from 'react';
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage';
import Notfoundpage from './pages/Notfoundpage';
import AdminPage from './pages/AdminPage';
import TrainerPage from './pages/TrainerPage';
import CustomerPage from './pages/CustomerPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import Dich_vu from './pages/Dich_vu';
import Su_kien from './pages/Su_kien';
import Goi_tap from './pages/Goi_tap';
import Blog from './pages/Blog';

const routes = [
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/dich-vu',
        element: <Dich_vu />
    },
    {
        path: '/su-kien',
        element: <Su_kien />
    },
    {
        path: '/goi-tap',
        element: <Goi_tap />
    },
    {
        path: '/blog',
        element: <Blog />
    },  
    {
        path: '/login',
        element: <Loginpage />
    },
    {
        path: '/change-password',
        element: <ChangePasswordPage />
    },
    {
        path: '/profile',
        element: <CustomerPage/>
    },
    {
        path: '/admin/*',
        element: <AdminPage />
    },
    {
        path: '/trainer/*',
        element: <TrainerPage />
    },
    {
        path: '/customer/*',
        element: <CustomerPage />
    },
    {
        path: '/customer/*',
        element: <CustomerPage />
    },
    {
        path: '*',
        element: <Notfoundpage />
    }
]

export default routes;