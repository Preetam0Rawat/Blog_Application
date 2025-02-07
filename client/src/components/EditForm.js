import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { editBlog } from '../api'
const EditForm = ({data}) => {

    const [formData, setFormData] = useState({
        title: data.title,
        description: data.description,
        selectedFile: data.selectedFile,

    })
    const [tags, setTags] = useState(data.tags)

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagTodelete) => setTags(tags.filter((tag) => tag !== tagTodelete))

    const handleSubmit = async() => {
       try {
        const id = data._id
         const response = await editBlog(id, {...formData, tags})
         console.log("Blog updated successfuly", response.data)
        window.location.reload()
       } catch (error) {
         console.log("Failed ", error.message)
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
                flex='1'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Typography fontSize='40px' fontWeight='bold'>Edit Blog</Typography>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    width='30vw'
                >
                    <TextField
                        id='title'
                        name='title'
                        label='title'
                        variant='outlined'
                        style={{ marginTop: '30px', width: '80%' }}
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id='description'
                        name='description'
                        label='description'
                        variant='outlined'
                        style={{ marginTop: '30px', width: '80%' }}
                        value={formData.description}
                        onChange={handleInputChange}

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
                            width: '80%',
                            backgroundColor: 'black'
                        }}
                        onClick={handleSubmit}
                    >Edit</Button>
                </Box>
            </Box>
          </div>
    )
}

export default EditForm
