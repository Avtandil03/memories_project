import React ,{useState, useEffect}from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import {  Link, useNavigate , useLocation} from 'react-router-dom'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const logOut = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/')
    setUser(null)
    localStorage.removeItem('profile',)
  }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer} >
        <img src={memoriesText} alt="icon" height="45px" />
        <img src={memoriesLogo} className={classes.image} alt="icon" height="35px" />
      </Link>
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