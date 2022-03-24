import styled from "@emotion/styled"
import { Comment, AccountCircle, Group, Grading } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FC } from "react"
import { Link, useLocation } from "react-router-dom";

const menu = [
    {
        id: '1',
        title: 'My page',
        path: '/profile',
        icon: <AccountCircle />
    },
    {
        id: '2',
        title: 'Messages',
        path: '/messages',
        icon: <Comment />
    },
    {
        id: '3',
        title: 'Friends',
        path: '/friends',
        icon: <Group />
    },
    {
        id: '4',
        title: 'News',
        path: '/news',
        icon: <Grading />
    },
    
   
]

interface IProps {

}

const StyledList = styled(Box)`
    background-color: #f1f7fa;
    border-radius: 8px;
    margin-top: 25px;
    overflow: hidden;

    .MuiListItemIcon-root {
        min-width: 34px;
        opacity: .5;
    }

    .MuiList-root {
        padding: 0;
    }

    .MuiListItem-root {
        background-color: #f1f7fa;
        
        .MuiListItemButton-root {
            padding: 15px 10px;
            
        }
        
    }
    
`;

export const SideMenu: FC<IProps> = () => {

    const location = useLocation();

    return (
        <StyledList >

           <List>
            {
                menu && menu.map(({ id, title, icon, path }) => (
                    <ListItem
                        button
                        component={Link} 
                        to={path}
                        key={id}
                        selected={path == location.pathname}
                        disablePadding
                    >
                        <ListItemButton  dense>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem> 

                ))
            }          
           </List>
            
        </StyledList>
    )
}