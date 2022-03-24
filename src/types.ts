import { Dispatch, SetStateAction } from "react";

export interface IUser {
    _id: string;
    name: string;
    email?: string;
    avatar: string;
    online?: boolean;
}

export interface IPost {
    _id: string;
    title: string;

    author?: IUser;
    createdAt?: string;
    images?: any[];
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;