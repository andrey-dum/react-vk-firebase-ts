import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { FC } from "react"
import { UserItem } from "./UserItem/UserItem";
import { IUser } from "../../types";

export const users: IUser[] = [
    {
        _id: '1',
        name: 'Tom Shelby',
        email: "",
        avatar: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
        online: true
    },
    {
        _id: '2',
        name: 'Alex Miller',
        email: "",
        avatar: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
        online: false
    },
]

interface IProps {

}

const StyledList = styled(Box)`

  
    
`;

export const UserItemList: FC<IProps> = () => {

    return (
        <StyledList >
            {
                users && users.map(user => (
                    <UserItem key={user._id} user={user} />
                ))
            }
            
        </StyledList>
    )
}