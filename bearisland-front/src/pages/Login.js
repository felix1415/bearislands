import React from 'react';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
// import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

const config = require('../config');



function ShouldRedirectToAdmin(props)
{
	if (props.redirect) {
		console.log("redirect to admin page");
		return <Redirect to='/admin' />
	}
	return null;
}

class Login extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state={email:'', password:'', open: false, loginMessage:'', redirect: false, isMounted: false};
		//user input
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		//snackbar bind
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	closeSnackbar (event, reason)
	{
    	this.setState({open: false});
	}

	handleChange (evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	handleSubmit(event)
	{
		event.preventDefault();
		var payload = {
			"email":this.state.email,
			"password":this.state.password
 		}
 		axios
	    .post(config.apiServer + config.serverPort + '/auth/login ', payload, {withCredentials: true})
	    .then(response =>
    	  	{
	    	  	if(response.status === 200)
	    	  	{
 					console.log("Login successful " + response.status); 
 					this.setState({loginMessage: 'Login successful.'});
 					this.setState({open: true});

 					this.props.setLoggedInCallback(true);
 					return true;
 				}
		  	})
	    .catch(err => 
	    	{
		    	this.setState({loginMessage: "Login failed."});
		    	this.setState({open: true});
	      		console.error("login failed: " + err);
	    	}); 		
	}

	render()
	{
		if(this.props.loggedIn)
		{
			return <ShouldRedirectToAdmin redirect={this.props.loggedIn}/>
		}
		return (
			<Box my={4}>
					<form onSubmit={this.handleSubmit}>
						<TextField
							autoFocus={true}
							name="email"
							label="Email"
			            	onChange={this.handleChange}
			             />
			           	<br/>                
			           	<TextField
			           		name="password"
			           		label="Password"
			           		type="password"
			            	onChange={this.handleChange}
			               />
			             <br/>
			             <Button type="submit" variant="contained" label="Submit" primary="true ">Submit</Button>
{/*			             
						<Snackbar
			              autoHideDuration={5000}
						  open={this.state.open}
						  onClose={this.closeSnackbar}
						  message={this.state.loginMessage}
						/>
*/}
					</form>

	             <br/>
	             <br/>

		    </Box>
		);
	}
}

export default Login;