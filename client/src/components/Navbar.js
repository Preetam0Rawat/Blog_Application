import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import Form from './Form'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const token = localStorage.getItem("token")


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate()
    const handleSignin = () => {
        navigate('/signin')
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/signin')
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
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
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
                        onClick={handleOpen}
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

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form />
                </Box>
            </Modal>
        </div>
    )
}

export default Navbar
