import { FC, useState } from "react"
import styled from "@emotion/styled"
import { Box, Button, TextField } from "@mui/material"
import { IPost, TypeSetState } from "../types";
import { users } from "../layout/Sidebar/UserItemList";


interface IProps {
    setPosts: TypeSetState<IPost[]>;
}



const StyledAddPost = styled(Box)`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 15px;

    .MuiInputBase-root {
        border-radius: 30px;
        background-color: #f9f9f9;

        input {
            height: 1em;
        }
    }

    
`;

export const AddPost: FC<IProps> = ({  
    setPosts
}) => {
    const [post, setPost ] = useState<IPost>({
        title: ''
    } as IPost)

    const handleChange = (e: any) => {
        setPost({
            ...post,
            title: e.target.value
        })
    }

    const addPost = () => {
        const newPost: IPost = {
            ...post,
            _id: String(Date.now()),
            author: users[0],
            createdAt: '5 min ago'
        }
        setPosts((prevSate: IPost[]) => ([...prevSate, newPost]));
        setPost({ title: '' } as IPost)
    }


    return (
        <StyledAddPost>
            <TextField
                name="title"
                fullWidth
                placeholder="Write new post..."
                value={post.title}
                onChange={handleChange}
            />

            <Box mt={2}>
                <Button 
                    color="primary" 
                    variant="outlined"
                    onClick={addPost}
                >Create</Button>
            </Box>
        </StyledAddPost>
      
    )
}