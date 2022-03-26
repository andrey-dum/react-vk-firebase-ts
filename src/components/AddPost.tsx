import { FC, useState } from "react"
import styled from "@emotion/styled"
import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { IPost, TypeSetState } from "../types";
import { useAuth } from "../context/useAuth";
import { addDoc, collection } from "firebase/firestore";


interface IProps {
    // setPosts: TypeSetState<IPost[]>;
}

const StyledAddPost = styled(Paper)`
    // border-radius: 10px;
    padding: 15px;

    .MuiInputBase-root {
        border-radius: 30px;
        background-color: #f5f5f5;

        input {
            height: .8em;
            padding: 14px 14px;
        }
    }

    
`;

export const AddPost: FC<IProps> = ({  
    // setPosts
}) => {
    const [post, setPost ] = useState<IPost>({
        title: ''
    } as IPost)
    
    const [loading, setLoading ] = useState(false)

    const {user, db} = useAuth()

    const handleChange = (e: any) => {
        setPost({
            ...post,
            title: e.target.value
        })
    }

    const addPost = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if(post.title && e.key === 'Enter' && user) {
            const newPost: IPost = {
                ...post,
                author: user,
                createdAt: '5 min ago'
            }

            setLoading(true)

            try {
                const docRef = await addDoc(collection(db, "posts"), newPost);
                // setPosts((prevSate: IPost[]) => ([newPost, ...prevSate]));
                setPost({ title: '' } as IPost)
                
              } catch (e) {
                console.error("Error adding document: ", e);
            } finally {
                setLoading(false)
            }
          
        }
    }


    return (
        <StyledAddPost variant="outlined">
            <Typography variant="h5" paragraph>Create new post... ✍🏻</Typography>
            <TextField
                name="title"
                fullWidth
                placeholder="Write new post..."
                value={post.title}
                onChange={handleChange}
                onKeyPress={addPost}
                disabled={loading}
            />

            {/* <Box mt={2}>
                <Button 
                    color="primary" 
                    variant="outlined"
                    onClick={addPost}
                >Create</Button>
            </Box> */}
        </StyledAddPost>
      
    )
}