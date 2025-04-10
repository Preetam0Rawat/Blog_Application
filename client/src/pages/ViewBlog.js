import React from 'react'
import { useBlog } from '../components/BlogContext'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { deleteBlog } from '../api'
import { useNavigate } from 'react-router-dom'

const ViewBlog = () => {


     const {selectedBlog} = useBlog()
    const data = selectedBlog
const navigate = useNavigate()

     const handleDelete = async() => {
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
    <div>
       {data.title}
        <Button size="small" onClick={handleDelete}><DeleteIcon /></Button>
       
    </div>
  )
}

export default ViewBlog
