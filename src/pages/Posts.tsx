import { FC } from "react"
import { Avatar, Box, ImageList, ImageListItem, Paper, Typography } from "@mui/material"
import { IPost } from "../types"
import { Link } from "react-router-dom"

interface IProps {
    posts: IPost[];
}

export const Posts: FC<IProps> = ({ posts }) => {

    return (
        <Box mt={3}>
            { posts?.map((post: IPost) => (
                <Paper key={post._id} sx={{padding: '15px'}}>
                    <Box display='flex' alignItems='center'>
                        <Box mr={1}><Avatar src={post.author?.avatar} /></Box>
                        <Box>
                            <Typography variant={'h6'}>
                                <Link to={`/profile/${post.author?._id}`} style={{textDecoration: 'none'}}>
                                    {post.author?.name}
                                </Link>
                                
                            </Typography>
                            <Typography variant="caption" sx={{color: '#999'}}>
                                {post?.createdAt}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mt={3}>
                        {post.title}
                    </Box>
                    { post.images?.length 
                    && <Box display={'flex'} justifyContent={'center'}>
                         <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                            {post.images?.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>

                        {/* {
                            post.images.map(img => (
                                <img key={img} src={img} />
                            ))
                        } */}
                        </Box>
                    }
                </Paper>
            )) }
        </Box>
            
    )
}

