import { Box } from "@mui/material"
import { collection, doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react"
import { Chat } from "../components/Chat/Chat";
import { useAuth } from "../context/useAuth";
import { FullWidthLayout } from "../layout/FullWidthLayout";
import { IMessage } from "../types";

interface IProps {
   
}


export const Messages: FC<IProps> = () => {

    // const [messages, setMessages] = useState<IMessage[]>([]);
    // const [loading, setLoading ] = useState(false)
    // const {db} = useAuth()


    // useEffect(() => {

    //     const unsub = onSnapshot(collection(db, "dialogs"), (querySnapshot) => {
    //       let data: IMessage[] = [];

    //       querySnapshot.docs.forEach((msg) => {
    //         data.push({
    //           ...msg.data(),
    //           _id: msg.id,
    //         } as IMessage)
    //       });
    //       setMessages([...data]);
    //     console.log(data)

    //       setLoading(false)
    //     })
    
    //       return () => { unsub() }
    
    //     }, [])


    return (
        <FullWidthLayout>
            <Box>
                <Chat />

                {/* <Box mt={3}>
                    { messages?.map((msg: IMessage) => (
                        <Paper key={msg._id} sx={{padding: '15px', marginBottom: '20px'}} variant="outlined">
                            <Box display='flex' alignItems='center'>
                                <Box mr={1}><Avatar src={msg.author?.avatar} /></Box>
                                <Box>
                                    <Typography variant={'h6'}>
                                        <Link to={`/profile/${msg.author?._id}`} style={{textDecoration: 'none'}}>
                                            {msg.author?.name}
                                        </Link>
                                        
                                    </Typography>
                                    <Typography variant="caption" sx={{color: '#999'}}>
                                        {msg?.createdAt}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box mt={3} mb={3}>
                                {msg.text}
                            </Box>
                        
                        </Paper>
                    )) }
                </Box> */}

            </Box>
        </FullWidthLayout>
            
    )
}

