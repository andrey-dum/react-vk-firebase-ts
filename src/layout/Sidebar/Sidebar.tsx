import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { FC } from "react"
import { useAuth } from "../../context/useAuth";
import { SideMenu } from "./SideMenu";
import { User } from "./UserItem/User";
import { UserItem } from "./UserItem/UserItem";
import { UserItemList } from "./UserItemList";

interface IProps {

}

const StyledUserItem = styled(Box)`

    
`;

export const Sidebar: FC<IProps> = () => {
    const {user, loading} = useAuth()

    return (
        <Box>
            <User /> 
              {/* { user && <UserItem loading={loading} user={user} me={user ? 'true' : ''} /> }  */}

            <UserItemList />

            <SideMenu />
        </Box>
    )
}