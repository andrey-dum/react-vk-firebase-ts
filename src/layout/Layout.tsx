import { Grid } from "@mui/material"
import { FC } from "react"
import { Header } from "./Header/Header"
import { Sidebar } from "./Sidebar/Sidebar"

interface IProps {

}

export const Layout: FC<IProps> = ({ children }) => {
    return (
        <div className="page">
            <Header />
            <Grid container spacing={2} paddingX={10} marginTop={2}>
                <Grid item sm={2}>
                <Sidebar />
                </Grid>
                <Grid item sm={8}>
                { children }
                </Grid>
            </Grid>

        </div>
    )
}