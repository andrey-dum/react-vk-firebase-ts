import styled from "@emotion/styled"
import { Avatar, Box, Button, Paper, Skeleton } from "@mui/material"
import { signOut } from "firebase/auth";
import { FC } from "react"
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { IUser } from "../../../types";

interface IProps {
    // user: IUser | null;
    me?: any;
    // loading?: boolean;
}

type ItemProps = {
    me?: any
  }


const StyledUserItem = styled(Paper)<ItemProps>`
    padding: 10px;
    background-color: #f1f7fa;
    border: none;
    margin-bottom: ${(props: ItemProps) => props.me ? '20px' : '5px'};

    a {
        text-decoration: none;
        color: #555;
    }

    .onlineDot {
        width: 10px;
        height: 10px;
        background-color: #2ecd2e;
        bottom: 0;
        position: absolute;
        right: 2px;
        border-radius: 50%;
    }
    
`;

export const User: FC<IProps> = ({ me }) => {

    const {user, loading, auth} = useAuth()

    if(loading || !user) {
        return <Skeleton height={100} />
    }
    
    return (
        <StyledUserItem variant="outlined" me={me}>
            <Link to={`/profile/${user._id}`} >
                <Box display={'flex'} alignItems={'center'} >
                
                    <Box position="relative" mr={1}>
                        <Avatar src={user.avatar} />
                        { user?.online && <Box className="onlineDot" /> }
                    </Box>
                    
                    <span>{ user.name }</span>
                </Box>
            </Link>
            <Box display='flex' justifyContent='flex-end'>
                <Button onClick={() => signOut(auth)} variant="outlined" size="small">LogOut</Button>
            </Box>
        </StyledUserItem>
    )
}