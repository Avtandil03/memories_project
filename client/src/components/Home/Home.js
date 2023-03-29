import React , {useState, useEffect} from 'react'
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useNavigate , useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { getPosts } from '../../actions/posts'
import Pagination from '../Pagination'
import { getPostBySearch } from '../../actions/posts'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentID] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const classes = useStyles()
  const dispatch = useDispatch() 
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1;
  const searchQuery =  query.get('searchQuery')

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPost()
    }
  }

  const handleAddTag = (tag) => {
    setTags([...tags, tag])
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
  }

  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostBySearch({search, tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      navigate('/')
    }
  }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9} >
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6}  md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name='search' 
                variant='outlined' 
                label='Search memories' 
                fullWidth value={search} 
                onKeyDown={handleKeyPress}
                onChange={(e) => { setSearch(e.target.value)}}
              />
              <ChipInput 
                className={classes.searchChipIn}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label="Search tags"
                variant='outlined'
              />
              <Button 
                onClick={searchPost} 
                className={classes.searchButton} 
                color='primary' 
                variant='contained'
              >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentID={setCurrentID} />
            { (!searchQuery && !tags.length) && 
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home