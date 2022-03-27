import { FieldValue } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export interface IImage {
    title: string;
    img: string;   
}

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
    createdAt?: any;
    images?: IImage[];
    timestamp?: any;
}

export interface IMessage {
    _id: string;
    text: string;
    createdAt?: string;
    author: any;
}

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;