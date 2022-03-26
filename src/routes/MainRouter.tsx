import { FC, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Layout } from "../layout/Layout";
import { routes } from "./routes";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '80vh' }} justifyContent={'center'} alignItems={'center'}>
      <CircularProgress />
    </Box>
  );
}

interface IProps {

}


export const MainRouter: FC<IProps> = () => {

    const { user, loading } = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/auth');
      }
    }, [user]);

    if(loading) {
        return <CircularIndeterminate />
    }

    return (
        <Layout>
            <Routes>
                {
                    routes.map(r =>
                         (
                            <Route
                                key={r.path}
                                path={r.path} 
                                element={ <r.component />} 
                            />
                        ) 
                        
                    )
                }
            </Routes>
        </Layout>
    )
}