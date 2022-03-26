import { FC } from "react"
import { Link } from 'react-router-dom'
import styled from "@emotion/styled"
import { Box, Container, Grid, TextField } from "@mui/material"


interface IProps {

}

const StyledHeader = styled(Box)`
    background: #4376a6;

    .MuiInputBase-root {
        border-radius: 30px;
        background-color: #1a4b78;

        input {
            height: 18px;
            padding: 10px 14px;
            color: #ccc;
        }
    }

    .logo {
        font-size: 30px;
    }
`

export const Header: FC<IProps> = () => {
    return (
        <StyledHeader p={1}>
            <Container maxWidth='md'>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <Box className="logo wave">
                            <Link to="/">👋</Link>
                        </Box>
                    </Grid>
                    <Grid item md={9}>
                        <Box display='flex' alignItems='center' sx={{height: '100%'}}>
                            <TextField 
                                variant="outlined"
                                fullWidth
                                placeholder="Search..."
                            />
                        </Box> 
                    </Grid>
                </Grid>
                     
            </Container>
        </StyledHeader>
    )
}