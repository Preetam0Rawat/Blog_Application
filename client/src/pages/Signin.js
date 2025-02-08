import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import siimage from '../images/signin.png'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../api'
const Signin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData(prevState=>({
            ...prevState, [name] : value
        }))
    }

    const handleSignin = async(e) =>{
        try {
            const response = await signin(formData)
            console.log("Singnin successful", response.data)
            //console.log("Token is", response.data.token)          To check whether token is being stored locally
            localStorage.setItem("token", response.data.token)
            navigate('/')
        } catch (error) {
            console.log("Signin failed: ", error)
            setFormData({email :'', password : ''})
        }
       
    }

    return (
        <Box display='flex' height='100vh'>
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography fontSize='50px' fontWeight='bold'>Sign in</Typography>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt={3} width={'30vw'}>
                    <TextField id='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                        style={{ marginTop: '30px', width: '80%' }}
                        value={formData.email}
                        onChange={handleInputChange}

                    />
                    <TextField id='password'
                        name='password'
                        label='Password'
                        variant='outlined'
                        style={{ marginTop: '30px', width: '80%' }}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <Link to='/signup' style={{ textDecoration: 'underline' }}>
                        <Typography style={{ marginTop: '20px', fontWeight: 'Bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                            Create account?
                        </Typography>
                    </Link>
                    <Button
                        style={{
                            border: '1px solid black',
                            marginTop: '10%',
                            width: '80%',
                            fontSize: '20px',
                            fontWeight: 'semi-bold',
                            color: 'white',
                            borderRadius: '15px',
                            backgroundColor : 'black'
                        }}
                        onClick={handleSignin}>
                            Sign in
                    </Button>
                </Box>
            </Box>
            <Box flex='1' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <img src={siimage} style={{maxHeight : '60vh', maxWidth : '100%'}} alt='siimage'/>
            </Box>
        </Box>
    )
}

export default Signin
