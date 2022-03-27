import { Avatar, Box, Typography } from "@mui/material"
import { FC } from "react"
import { useAuth } from "../context/useAuth"
import { Layout } from "../layout/Layout"

interface IProps {
   
}

export const Profile: FC<IProps> = () => {

    const {user} = useAuth()

    return (
        <Layout>
            <Box>
                <Box mb={2}><Typography variant="h4">Profile</Typography></Box>
                <Box><Avatar src={user?.avatar} sx={{ width: 100, height: 100 }}  /></Box>
                <Box>{user?.name}</Box>
                <Box>{user?.email}</Box>
            </Box>
        </Layout>
            
    )
}

