import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit'

import { useNavigate } from 'react-router-dom'
import { useBlog } from './BlogContext.js';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function Blog({data}) {



   
  const navigate = useNavigate()
  const {setSelectedBlog} = useBlog();
   
  const handleEditBlog = () =>{
    setSelectedBlog(data)
    navigate('/editForm')                

   }

   const handleClickCard = () =>{
    setSelectedBlog(data)
    navigate('/viewBlog') 
   }

  return (
    <>
      <Card sx={{ width: '20vw', height: '45vh', borderRadius: 6, margin: 6 }}
        >
        <CardMedia
          sx={{ height: 240 }}
          image= {data.selectedFile}
          title="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {data.title}
          </Typography>
         
          <Typography color='grey'
          sx = {{fontSize : '18px', lineHeight : '25px', margin : '10px 0', fontWeight : '1000'}}>
            {data.tags.map((tag)=> `#${tag} `)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditBlog}><EditIcon sx={{ mr: 1}} />EDIT BlOG</Button>
          <Button size='small' onClick={handleClickCard}>  <VisibilityIcon sx={{ mr: 1 }} /> View Blog</Button>
        </CardActions>
      </Card>

   
    </>
  );
}
