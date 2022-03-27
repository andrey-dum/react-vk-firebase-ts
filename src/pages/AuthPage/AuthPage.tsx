import styled from "@emotion/styled";
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import { updateProfile } from "firebase/auth";
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../api";
import { useAuth } from "../../context/useAuth";
import { Layout } from "../../layout/Layout";


interface IProps {
   
}

interface IUserData {
    name?: string;
    email: string;
    password: string;
}

const StyledBox = styled(Box)`
    .active {
        font-weight: bold;
    }
    cursor: pointer;
    font-size: 15px;
`



export const AuthPage: FC<IProps> = () => {

    const {user} = useAuth()
    const navigate = useNavigate();

    const [data, setData] = useState<IUserData>({name: '',email: '', password: ''});
    const [isRegForm, setIsRegForm] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
          navigate('/');
        }
      }, [user]);

    const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const {email, password} = data;

        if(isRegForm) {
            //register
            try {
                const user = await AuthApi.register(email, password)
                await updateProfile(user, {
                    displayName: data.name
                })

            } catch (error: any) {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            }
        }

        //login
        try {
            const user = await AuthApi.login(email, password)
           
        } catch (error: any) {
            // const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage)
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <Layout>
        <Box mt={3} display='flex' justifyContent='center'>
        <form onSubmit={handleLogin} style={{maxWidth: 420}}>

            <Typography variant="h5" paragraph>
                {isRegForm ? 'Registration' : 'Sign In'}
            </Typography>

            {
                isRegForm &&
                    <TextField 
                        type='text'
                        name='name'
                        label='Name'
                        value={data.name}
                        onChange={handleChange}
                        fullWidth
                        style={{marginBottom: '20px'}}
                    />
            }
            <TextField 
                type='email'
                name='email'
                label='Email'
                value={data.email}
                onChange={handleChange}
                required
                fullWidth
                style={{marginBottom: '20px'}}
            />
            <TextField 
                type='password'
                name='password'
                label='Password'
                value={data.password}
                onChange={handleChange}
                required
                fullWidth
            />

            {error && 
                <Box mt={2} display={'flex'} justifyContent={'center'}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            }

            <Box display='flex' justifyContent='center' mt={2}>
                <StyledBox display={'flex'}>
                    <Box
                        mr={1}
                        className={isRegForm ? '' : 'active'}
                        onClick={() => setIsRegForm(false)}
                    >Sign In</Box>|
                    <Box
                        ml={1}
                        onClick={() => setIsRegForm(true)}
                        className={isRegForm ? 'active' : ''}
                    >Register</Box>
                </StyledBox>
                {/* <ButtonGroup>
                    <Button 
                        variant={isRegForm ? 'outlined' : 'contained'} 
                        onClick={() => setIsRegForm(false)}
                    >Sign In</Button>
                    <Button 
                        onClick={() => setIsRegForm(true)}
                        
                        variant={isRegForm ? 'contained' : 'outlined'} 
                    >Register</Button>
                </ButtonGroup> */}
            </Box>

            <Box mt={2} display={'flex'} justifyContent={'center'}>
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </Box>

            
        </form>
        
        </Box>
        </Layout>    
    )
}

