import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';


import {withRouter} from 'react-router';
import Link from '@material-ui/core/Link';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RLink
} from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class CustomizedMenus extends React.Component
{

  constructor(props)
  {
      super(props);
      this.state = {anchorEl: null};

      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event)
  {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  render()
  {
    console.log(this.state.anchorEl)
      return (
        <div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            <MenuIcon />
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <StyledMenuItem component={RLink} to='/' onClick={this.handleClose}>
              <ListItemText primary="HOME" />
            </StyledMenuItem>
            {/*<StyledMenuItem component={RLink} to='/dayz' onClick={this.handleClose}>
              <ListItemText primary="DAYZ" />
            </StyledMenuItem>*/}
            <StyledMenuItem component={RLink} to='/rust' onClick={this.handleClose}>
              <ListItemText primary="RUST" />
            </StyledMenuItem>
            <StyledMenuItem component={RLink} to='/contact' onClick={this.handleClose}>
              <ListItemText primary="CONTACT" />
            </StyledMenuItem>
          </StyledMenu>
        </div>
      );
  }
}

// export default CustomizedMenus;
export default withRouter(CustomizedMenus) ;