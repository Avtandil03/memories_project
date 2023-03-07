import React ,{useState, useEffect}from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import {  Link, useNavigate , useLocation} from 'react-router-dom'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import memories from '../../images/memories.png'

const Navbar = () => {
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile',)))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = user?.token

    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logOut()
    }

    setUser(JSON.parse(localStorage.getItem('profile',)))
  }, [location])

  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/')
    setUser(null)
  }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer} >
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img src={memories} className={classes.image} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile} >
            <Avatar className={classes.purple} alt={user.result.name} src={ user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logOut}>Logout</Button>
          </div>
        ) :(
          <Button variant='contained' className={classes.logout} component={Link} to='/auth' color='primary'>Sign In</Button>
        )

        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;