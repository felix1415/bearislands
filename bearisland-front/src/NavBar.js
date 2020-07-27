import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';

import Home from './pages/Home';
import DayZ from './pages/DayZPage';
import Rust from './pages/RustPage';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Admin from './pages/Admin';
import ChatWindow from './pages/ChatWindow';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RLink
} from "react-router-dom";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  title: {
    marginLeft: theme.spacing(10),
    flexGrow: 1,
  },
});

function LoginOrLogout(props)
{
    if(props.loggedInState)
    {
        return(
          <div> 
              <Button component={RLink} to="/admin" >Dashboard</Button>
              <Button component={RLink} to="/logout" >Logout</Button>
          </div>);
    }
    return <Button component={RLink} to="/login" >Login</Button>;
}



class MainBar extends React.Component
{

// export default function MainBar() {
  constructor(props)
  {
    super(props);
    // this.state={loggedIn: false};
    this.state = JSON.parse(localStorage.getItem('rootNavBarState'))
        ? JSON.parse(localStorage.getItem('rootNavBarState'))
        : {loggedIn: false};
    this.setLoggedIn = this.setLoggedIn.bind(this);
  }


  setLoggedIn(newLoggedInValue, callback)
  {
      this.setState({ loggedIn: newLoggedInValue });
      localStorage.setItem('rootNavBarState', JSON.stringify(this.state));
  }

  render (){
    const { classes } = this.props;
    return(      
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <ButtonGroup variant="outlined" size="large" aria-label="primary button group"> 
              {/*<nav>*/}
                <Link component={RLink} to="/" variant="button" color="textPrimary" href="#" className={classes.link} >
                  Home
                </Link>
                <Link component={RLink} to="/dayz" variant="button" color="textPrimary" href="#" className={classes.link} >
                  DayZ
                </Link>
                <Link component={RLink} to="/rust" variant="button" color="textPrimary" href="#" className={classes.link}>
                  Rust
                </Link>
                <Link component={RLink} to="/contact" variant="button" color="textPrimary" href="#" className={classes.link}>
                  Contact
                </Link>

              {/*</nav>*/}
              </ButtonGroup>

              <Typography variant="h6" className={classes.title}>

              </Typography>

              <LoginOrLogout loggedInState={this.state.loggedIn} />
            </Toolbar>
          </AppBar>


          {/*routes*/}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/dayz">
              <DayZ />
            </Route>
            <Route exact path="/rust">
              <Rust />
            </Route>
            <Route path="/contact/:uuid" render={({match}) => (
                    <ChatWindow
                      uuid={match.params.uuid}
                    />
            )}/>
            <Route exact path="/contact/">
              <Contact />
            </Route>
            <Route exact path="/login">
              <Login setLoggedInCallback={this.setLoggedIn} loggedIn={this.state.loggedIn}/>
            </Route>
            <Route exact path="/logout">
              <Logout setLoggedInCallback={this.setLoggedIn} loggedIn={this.state.loggedIn} />
            </Route>
            <Route exact path="/admin">
              <Admin loggedIn={this.state.loggedIn} />
            </Route>
          </Switch>
        </div>
      </Router>
    )};

  // );
}

// export default MainBar;
export default withStyles(useStyles, { withTheme: true })(MainBar);