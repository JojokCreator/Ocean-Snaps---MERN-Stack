import { AppBar, Avatar, Typography, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom'
import useStyles from './styles.js'
import camera from '../../images/camera.png';
import { useState, useEffect } from 'react'
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { classes } = useStyles();
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate(0)

    setUser(null)
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
        <Typography component={Link} to="/" sx={{fontFamily: 'Raleway'}} className={classes.heading} variant="h2" align="center">Ocean Snaps </Typography>
        <img className={classes.image} src={camera} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}  
      </Toolbar>    
    </AppBar>
  )
}

export default Navbar