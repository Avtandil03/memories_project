import React , {useState, useEffect} from 'react'
import { AppBar, Container, Grid, Grow, Paper, TextField } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from '../../styles'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { getPosts } from '../../actions/posts'
import Pagination from '../Pagination'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentID] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch() 
  const query = useQuery()
  const history = useHistory()

  const 
  const page = query.get('page') || 1;
  const searchQuery =  query.get('seatchQuery')

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9} >
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6}  md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search memories' fullWidth value="TEST" onChange={}/>
            </AppBar>
            <Form currentId={currentId} setCurrentID={setCurrentID} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home