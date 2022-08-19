import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'

import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import Pagination from '../pagination.js';

import { getPosts, getPostsBySearch } from '../../actions/posts';

import useStyles from './styles.js'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0)
    const [search, setSearch] =useState();
    const [tags, setTags] =useState([]);
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
  
    const searchPost = () => {
      if(search.trim()) {
        dispatch(getPostsBySearch(search));  
        navigate(`/posts/search?searchQuery=${search}`)    
      } else {
        navigate('/')
      }
    }

    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        searchPost()
      }
    };

  return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
          <TextField name="search" variant="outlined" label="Search" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}}/>
          <Button onClick={searchPost} className={classes.search} color="primary" variant="contained">Search</Button>
        </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId}/>
          {(!searchQuery && !tags.length) && (
          <Paper className={classes.pagination} elevation={6}>
            <Pagination page={page}/>
          </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home