import { FC, useEffect, useState } from "react"
import { Avatar, Box, CircularProgress, ImageList, ImageListItem, Paper, Typography } from "@mui/material"
import { IPost } from "../types"
import { Link } from "react-router-dom"
import { collection, onSnapshot } from "firebase/firestore"
import { useAuth } from "../context/useAuth"



export const Posts: FC = () => {

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading ] = useState(true)
    
    const {db} = useAuth()

    useEffect(() => {

        const unsub = onSnapshot(collection(db, "posts"), (querySnapshot) => {
          let p: IPost[] = []
          console.log(p)
          querySnapshot.docs.forEach((d) => {
            p.push({
              ...d.data(),
              _id: d.id,
            } as IPost)
          });
          setPosts([...p]);

          setLoading(false)
          // setPosts(prev => [...p, ...prev])
        })
    
          return () => { unsub() }
    
        }, [])

        if(loading) {
            return <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center'
                style={{height: '160px'}}
            >
                <CircularProgress />
            </Box>
        }
        
        if(!posts.length) {
            return <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center'
                style={{height: '160px'}}
            >
                <Typography style={{fontWeight: '800', color: '#ccc', fontSize: 30}}>
                    Posts not found...
                </Typography>
            </Box>
        }


    return (
        <Box mt={3}>
            { posts?.map((post: IPost) => (
                <Paper key={post._id} sx={{padding: '15px', marginBottom: '20px'}} variant="outlined">
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
                    <Box mt={3} mb={3}>
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

