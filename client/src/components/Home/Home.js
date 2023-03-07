import React , {useState, useEffect} from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from '../../styles'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'

function Home() {
  const [currentId, setCurrentID] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch() 

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])

  return (
    <Grow in>
      <Container>
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7} >
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={4} >
            <Form currentId={currentId} setCurrentID={setCurrentID} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home