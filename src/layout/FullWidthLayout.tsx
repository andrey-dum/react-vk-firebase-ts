import { Container, Grid } from "@mui/material"
import { FC } from "react"
import { useAuth } from "../context/useAuth"
import { Header } from "./Header/Header"
import { Sidebar } from "./Sidebar/Sidebar"

interface IProps {

}

export const FullWidthLayout: FC<IProps> = ({ children }) => {

    return (
        <div className="page">
            <Header />
            <Container maxWidth="lg">
                { children }
            </Container>
        </div>
    )
}