import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

 

    const token = localStorage.getItem("token")


   

    const navigate = useNavigate()
    const handleSignin = () => {
        navigate('/signin')
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/signin')
    }


    const handleCreateBlog = () =>{
        navigate('/createForm')
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingY: '20px',
                paddingX: '20px',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}>

                <Typography variant='h4'>Blog Website</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    paddingY: '20px',
                paddingX: '20px'

                }}>
                    <Button sx={{
                        marginRight: 1,
                        color: 'white',
                        bgcolor: 'black',
                        borderRadius: 10,
                        '&:hover': {
                            bgcolor: '#FFD42F',
                            color: 'black'
                        }
                    }}
                        variant='contained'
                        // onClick={handleOpen}
                        onClick={handleCreateBlog}
                    >Create Blog
                    </Button>
                   
                   {!token &&
                   (
                    <Button sx={{
                        color: 'white',
                        bgcolor: 'black',
                        borderRadius: 10,
                        '&:hover': {
                            bgcolor: '#FFD42F',
                            color: 'black'
                        }
                    }}
                        variant='contained'
                        onClick={handleSignin}
                    >Signin

                    </Button>
                    )}
                    {token &&

                        (
                            <Button sx={{
                                color: 'white',
                                bgcolor: 'black',
                                borderRadius: 10,
                                ml: 1,
                                '&:hover': {
                                    bgcolor: '#FFD42F',
                                    color: 'black'
                                }
                            }}
                                variant='contained'
                                onClick={handleSignOut}
                            >Sign out

                            </Button>
                        )}
                </Box>
            </Box>      
        </div>
    )
}

export default Navbar
