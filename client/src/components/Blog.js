import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Modal } from '@mui/material';
import EditForm from './EditForm';
import { deleteBlog } from '../api/index.js';

//import {useNavigate} from 'react-router-dom';

export default function Blog({data}) {


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



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //const navigate = useNavigate()

  const handleDelete = async() => {
    try {
      const token = localStorage.getItem("token")
      const response = await deleteBlog(data._id, token)
      console.log("blog deleted successfully", response.data)
      // if(response.status === 200){
      //   window.location.reload()
      // }
      //navigate('/')      not working
    } catch (error) {
        console.log("Deletion failed" , error)
        alert(error.response.data.mssg)
      }
  }


  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: 6, margin: 6 }}>
        <CardMedia
          sx={{ height: 240 }}
          image= {data.selectedFile}
          title="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {data.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.description}
          </Typography>
          <Typography color='Text.secondary'
          sx = {{fontSize : '20px', lineHeight : '25px', margin : '10px 0', fontWeight : '400'}}>
            {data.tags.map((tag)=> `#${tag}`)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDelete}><DeleteIcon /></Button>
          <Button size="small" onClick={handleOpen}><EditIcon /></Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm data ={data}/>
        </Box>
      </Modal>
    </>
  );
}
