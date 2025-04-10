import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { editBlog } from '../api'
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../components/BlogContext'


const EditForm = () => {
    const {selectedBlog} = useBlog()
    const data = selectedBlog
    const [formData, setFormData] = useState({
        title: data.title,
        description: data.description,
        selectedFile: data.selectedFile,

    })
    const [tags, setTags] = useState(data.tags)

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagTodelete) => setTags(tags.filter((tag) => tag !== tagTodelete))


    const navigate = useNavigate()
    const handleSubmit = async() => {
       try {
        const id = data._id
        const token = localStorage.getItem("token")
         const response = await editBlog(id, token,{...formData, tags})
         console.log("Blog updated successfuly", response.data)
         navigate('/')
    } catch (error) {
         //console.log("Updation Failed ", error.message)
         alert(error.response.data.mssg)
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
                <Typography fontSize='40px' fontWeight='bold'>Edit Blog Component</Typography>
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
                    >Edit</Button>
                </Box>
            </Box>
          </div>
    )
}

export default EditForm
