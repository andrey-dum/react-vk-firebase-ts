import { createContext, FC, useEffect, useMemo, useState } from "react"
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from '../firebase';
import { IUser, TypeSetState } from "../types"
import { users } from "../layout/Sidebar/UserItemList"
import { Firestore } from "firebase/firestore";

interface IContext {
    user: IUser | null;
    setUser: TypeSetState<IUser | null>;
    auth: Auth;
    db: Firestore;
    loading: boolean;
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC = ({children}) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const auth = getAuth();

    useEffect(() => {
        
        setLoading(true)
        const unListen = onAuthStateChanged(auth, (user) => {
          
            setUser(user ? {
                _id: user.uid,
                avatar: users[0].avatar,
                name: user.displayName || user.email || ''
            } : null)

            setLoading(false)
        });

        

        return () => {
            unListen()
        }

    }, [])

    const values = useMemo(() => ({
        user,
        setUser,
        auth,
        loading,
        db
    }), [user, auth, loading])

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}