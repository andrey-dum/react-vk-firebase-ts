import { Friends } from "../pages/Friends";
import { Home } from "../pages/Home";
import { Messages } from "../pages/Messages";
import { Profile } from "../pages/Profile";
import { AuthPage } from "../pages/AuthPage/AuthPage";

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        auth: true
    },
    // {
    //     path: '/profile',
    //     exact: true,
    //     component: Profile,
    //     auth: true
    // },
    {
        path: '/profile/:id',
        exact: false,
        component: Profile,
        auth: true
    },
    {
        path: '/messages',
        exact: true,
        component: Messages,
        auth: true
    },
    {
        path: '/message/:id',
        exact: false,
        component: Messages,
        auth: true
    },
    {
        path: '/friends',
        exact: true,
        component: Friends,
        auth: true
    },
    {
        path: '/friends/:id',
        exact: false,
        component: Friends,
        auth: true
    },
    {
        path: '/auth',
        exact: true,
        component: AuthPage,
        auth: false
    },
]