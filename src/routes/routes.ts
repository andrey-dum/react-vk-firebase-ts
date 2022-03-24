import { Home } from "../pages/Home";

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        auth: true
    },
    {
        path: '/profile/:id',
        exact: false,
        component: Home,
        auth: true
    },
    {
        path: '/messages',
        exact: true,
        component: Home,
        auth: true
    },
    {
        path: '/message/:id',
        exact: false,
        component: Home,
        auth: true
    },
    {
        path: '/friends',
        exact: true,
        component: Home,
        auth: true
    },
    {
        path: '/friends/:id',
        exact: false,
        component: Home,
        auth: true
    },
    {
        path: '/auth',
        exact: true,
        component: Home,
        auth: false
    },
]