import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import {useNavigate} from 'react-router-dom'
import { createBlog } from '../api/index.js'
const CreateForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        selectedFile: '',

    })

    const navigate = useNavigate()

    const [tags, setTags] = useState([])

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagTodelete) => setTags(tags.filter((tag) => tag !== tagTodelete))

    const handleSubmit = async(e) => {
       try {
         const token = localStorage.getItem("token")
         const response = await createBlog({...formData, tags}, token);  
         console.log("Blog Created Successfully",response.data)
          navigate('/') 
        } catch (error) {
         //console.log("Creation failed", error)
         alert(error.response.data.mssg)
         setFormData({title : '', description : '', selectedFile: ''})
       }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }))
    }
    return (
        <div>
            <Box
                display='flex'
                // flex='1'
                flexDirection='column'
                justifyContent='center'
                alignItems='left'
                border = '3px solid black'
                borderRadius= '60px'
                mt='5vh'
                ml='10vw'
                mr='10vw'
                paddingBottom='5vh'
            >
                <Typography fontSize='40px' fontWeight='bold'>Create Blog</Typography>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    // width='30vw'
                >
                    <TextField
                        id='title'
                        name='title'
                        label='Title'
                        variant='outlined'
                        style={{ marginTop: '30px', width: '80%' }}
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id='description'
                        name='description'
                        label='Description'
                        variant='outlined'
                        style={{ marginTop: '30px', width : '80%', height : '20%'}}
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        minRows={15}
                        maxRows={15}

                    />

                    <ChipInput
                        style={{ marginTop: '30px' }}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label='Tags'
                        variant='outlined'
                    />
                    <div style={{ marginTop: '30px', width: '80%' }}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => { setFormData({ ...formData, selectedFile: base64 }) }} />
                    </div>
                    <Button
                        style={{
                            border: '1px solid black',
                            marginTop: '10%',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'white',
                            borderRadius: '15px',
                            width: '30%',
                            backgroundColor: 'black'
                        }}
                        onClick={handleSubmit}
                    >Create</Button>
                </Box>
            </Box>
         </div>
    )
}

export default CreateForm
