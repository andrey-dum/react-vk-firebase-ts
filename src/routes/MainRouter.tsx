import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

interface IProps {

}


export const MainRouter: FC<IProps> = () => {

    const isAuth = true;

    return (
        <Routes>
            {
                routes.map(r => r.auth && isAuth 
                    ? (
                        <Route
                            key={r.path}
                            path={r.path} 
                            element={ <r.component />} 
                        />
                     ) 
                    : false
                )
            }
        </Routes>
    )
}