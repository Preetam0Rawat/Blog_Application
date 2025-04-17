import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import Blog from '../components/Blog'
import { getAllBlogs, getBlogBysearch } from '../api/index.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [blogs, setBlogs] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const navigate = useNavigate()

  const handleAdd = (tag) => setTags([...tags, tag])
  const handleDelete = (tagTodelete) => setTags(tags.filter((tag) => tag !== tagTodelete))

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlogs()
        setBlogs(response.data)
        console.log("Getting all blogs successful", response.data)
      } catch (error) {
        //console.log("Failed", error)
        alert(error.response.data.mssg)
      }
    }

    getBlogs()
  }, [])

  const handleSearch = async () => {
    try {
      if (search.trim() || tags.length > 0) {
        const response = await getBlogBysearch({ search, tags: tags.join(',') })
        console.log("Search sucessful", response.data)
        setSearchResult(response.data.blogs)
        navigate(`/blog/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`)
      } else {
        navigate('/')
        alert("No results found")
      }
    } catch (error) {
      //console.log("Search failed ", error.message)
     alert(error.response.data.mssg)
    }
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: 4 }} >
        <Box display='flex' justifyContent='center' alignItems='center'>
          <TextField
            name='search'
            label='searc Blogs'
            variant='outlined'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: '20px' }}
          />

          <ChipInput
            style={{ marginRight: '20px' }}
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label='search tags'
            variant='outlined'
          />
          <Button
            sx={{
              color: 'white',
              mt: 0.5,
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: '#FFD42F',
                color: 'black'
              }
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        <Grid container alignItems='stretch' spacing={1} mt={4}>
          {searchResult.length > 0 ? (
            <>
              <Typography variant='h5'>Search Results:{searchResult.length}</Typography>
              <Grid container alignItems='stretch' spacing={2} >
                {searchResult.map((blog) => (
                  <Grid item key={blog._id} xs={12} sm={6} md={6} lg={4}>
                     <Box display='flex' justifyContent='center' >
                      <Blog data={blog} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant='h5'>All Blogs</Typography>
              <Grid container alignItems='stretch' spacing={2}>
                {blogs.map((blog) => (
                  <Grid item key={blog._id} xs={12} sm={6} md={6} lg={4}>
                    <Box display='flex' justifyContent='center' >
                      <Blog data={blog} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>

      </Box>
    </div>
  )
}

export default Home
