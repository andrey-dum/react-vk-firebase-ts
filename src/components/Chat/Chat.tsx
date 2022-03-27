import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import classes from './Chat.module.css'
import { IMessage, IUser } from '../../types';
import { useAuth } from '../../context/useAuth';
import { addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { users } from '../../layout/Sidebar/UserItemList';

interface IProps {
    // messages: IMessage[]
}

const initialState ={
    text: '',
    author: '',
    createdAt: ''
}

export const Chat: FC<IProps> = () => {

    const {user, db} = useAuth()

    const [message, setMessage ] = useState<IMessage>(initialState as IMessage)
    const [selectedFriend, setSelectedFriend ] = useState(null as IUser | null)
    const [loading, setLoading ] = useState(false)
    const [dialog, setDialog ] = useState<any>(null)
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        if(dialog?.id) {
            const collectionRef = collection(db, "dialogs", dialog.id, "messages");
            let data: IMessage[] = [];

            onSnapshot(collectionRef, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push({
                        ...doc.data(),
                        _id: doc.id,
                    } as IMessage)
                });

                setMessages([...data]);
                
              });
              
        }

        }, [dialog])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage({
            ...message,
            text: e.target.value
        })
    }

    console.log(messages)

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        
        if(message.text && user && dialog?.id) {
            const newPost: IMessage = {
                ...message,
                author: user,
                createdAt: '5 min ago'
            }

            // setLoading(true)

            try {
                // const docRef = await addDoc(collection(db, "messages"), newPost);

                const myDocRef = doc(db, "dialogs", dialog.id);
                const colRef = collection(myDocRef, "messages")
                await addDoc(colRef, {
                ...newPost
                });

                setMessage(initialState as IMessage)
                
              } catch (e) {
                console.error("Error adding document: ", e);
            } finally {
                // setLoading(false)
                setMessage(initialState as IMessage)
            }
          
        }
    }

  
    
    const checkDialogs = async () => {
        const q = query(collection(db, "dialogs"));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((dialog) => ({
            ...dialog.data(),
            id: dialog.id,
        }));

        if(!queryData.length && selectedFriend) {
            const userData = {
                friend: selectedFriend
            }

            try {
                const docRef = await addDoc(collection(db, "dialogs"), {...userData});
              } catch (e) {
                console.error("Error adding document: ", e);
            } 
        }


        if(queryData.length && selectedFriend) {
            const findedDialog = selectedFriend && queryData.filter((d: any) => d.friend._id === selectedFriend?._id)[0];

            if(findedDialog) {
                // await addDoc(collection(db, "dialogs"), {messages});

                // const myDocRef = doc(db, "dialogs", findedDialog.id);
                // const updateTimestamp = await updateDoc(myDocRef, {
                //     messages: [...messages, newPost]
                // });

                setDialog(findedDialog)

                // const collectionRef = collection(db, "dialogs", findedDialog.id, "messages");
                // onSnapshot(collectionRef, (querySnapshot) => {
                //     querySnapshot.forEach((doc) => {
                //       console.log("Id: ", doc.id, "Data: ", doc.data());
                //     });
                //   });
                
            }

            if(!findedDialog) {
                const userData = {
                    friend: selectedFriend
                }
                try {
                    const docRef = await addDoc(collection(db, "dialogs"), {...userData});
                  } catch (e) {
                    console.error("Error adding document: ", e);
                } 
            }

        } 
    }

    const onSelect = (user : IUser) => {
        setSelectedFriend(user)
    }


    useEffect(() => {
        checkDialogs()
    }, [selectedFriend])
   

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    {
                        selectedFriend ?
                            <ListItem button key="RemySharp">
                                <ListItemIcon>
                                <Avatar alt="Remy Sharp" src={selectedFriend?.avatar} />
                                {/* <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
                                </ListItemIcon>
                                <ListItemText primary={selectedFriend?.name}></ListItemText>
                                {/* <ListItemText primary="John Wick"></ListItemText> */}
                            </ListItem>
                        :
                            <ListItem button key="RemySharp">
                                <ListItemIcon>
                                <Avatar alt="Remy Sharp" src={user?.avatar} />
                                {/* <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
                                </ListItemIcon>
                                <ListItemText primary={user?.name}></ListItemText>
                                {/* <ListItemText primary="John Wick"></ListItemText> */}
                            </ListItem>
                    }
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    {
                        users.map((user) => (
                            <ListItem 
                                selected={user?._id === selectedFriend?._id} 
                                button 
                                key={user._id}
                                onClick={() => onSelect(user)}
                            >
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src={user?.avatar} />
                                </ListItemIcon>
                                <ListItemText>{user?.name}</ListItemText>
                                <ListItemText secondary="online" ></ListItemText>
                            </ListItem>
                        ))
                    }
                    
                </List>
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                
                  
                    { messages?.map((msg: IMessage) => (
                        <ListItem key={msg._id} 
                            style={{
                                wordBreak: 'break-word'
                                
                            }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box 
                                    display={'flex'} 
                                    alignItems={'center'} 
                                    justifyContent={(user && user?._id === msg.author._id) ? 'flex-end' : 'flex-start'}
                                    >
                                    <Box 
                                        
                                    >
                                        <Box
                                            display={'flex'} 
                                            alignItems={'center'}
                                            style={{
                                                background: '#f1f7fa',
                                                padding: '10px 20px',
                                                borderRadius: '40px',
                                                maxWidth: 300,
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Avatar alt="" src={user?.avatar} />
                                            </ListItemIcon>
                                    

                                            <ListItemText style={{flex: 'auto'}} primary={msg.text}></ListItemText>
                                        </Box>
                                        <ListItemText secondary={<span style={{fontSize: 13, textAlign: 'right', display: 'block' }}>10:30</span> }  />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <ListItemText secondary="10:30"></ListItemText> */}
                            </Grid>
                        </Grid>
                    </ListItem>
                    ))
                 }

                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField 
                            onChange={handleChange} 
                            value={message.text} 
                            id="outlined-basic-email" 
                            label="Type Something" 
                            fullWidth 
                        />
                    </Grid>
                    <Grid item xs={1} >
                        <Fab color="primary" aria-label="add" onClick={sendMessage} style={{marginLeft: 12}}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}
