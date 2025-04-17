import React from 'react'
import { useBlog } from '../components/BlogContext'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { deleteBlog } from '../api'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Box, Chip} from '@mui/material';
import bgImage from '../images/ViewBlogBG.jpg'

const ViewBlog = () => {


     const {selectedBlog} = useBlog()
    const data = selectedBlog
const navigate = useNavigate()

     const handleDelete = async() => {
      const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

      if (!confirmDelete) {
        return;
      }
        try {
          const token = localStorage.getItem("token")
          const response = await deleteBlog(data._id, token)
          console.log("blog deleted successfully", response.data)
          // if(response.status === 200){
          //   window.location.reload()
          // }
          navigate('/')     
        } catch (error) {
            console.log("Deletion failed" , error)
            alert(error.response.data.mssg)
          }
      }
    
  return (
      <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
        <Card sx={{ maxWidth: 800, margin: '20px auto', padding: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {data.title}
            </Typography>
  
            
            {data.selectedFile && (
              <Box sx={{ margin: '20px 0' }}>
                <img
                  src={data.selectedFile}
                  alt="blog visual"
                  style={{ width: '100%', borderRadius: '12px' }}
                />
              </Box>
            )}
  
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line', marginBottom: 2 }}>
              {data.description}
            </Typography>
  
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' }}>
              {data.tags?.map((tag, index) => (
                <Chip key={index} label={`#${tag}`} color="primary" variant="outlined" />
              ))}
            </Box>
  
            
          </CardContent>
  
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Button size="small" color="error" onClick={handleDelete} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Box>
        </Card>
        </Box>
      
  )
}

export default ViewBlog
