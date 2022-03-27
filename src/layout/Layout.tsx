import { Container, Grid } from "@mui/material"
import { FC } from "react"
import { useAuth } from "../context/useAuth"
import { Header } from "./Header/Header"
import { Sidebar } from "./Sidebar/Sidebar"

interface IProps {

}

export const Layout: FC<IProps> = ({ children }) => {
    const { user } = useAuth()

    return (
        <div className="page">
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={2} marginTop={2}>
                    {user &&
                        <Grid item sm={3}>
                            <Sidebar />
                        </Grid>
                    }
                    <Grid item sm={user ? 9 : 12}>
                    { children }
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}