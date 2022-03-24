import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { FC } from "react"
import { SideMenu } from "./SideMenu";
import { UserItemList } from "./UserItemList";

interface IProps {

}

const StyledUserItem = styled(Box)`

    
    
`;

export const Sidebar: FC<IProps> = () => {
    return (
        <Box>
            <UserItemList />

            <SideMenu />
        </Box>
    )
}