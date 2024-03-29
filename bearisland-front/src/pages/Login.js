import React from 'react';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
// import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import PageCounter from '../utils/PageCounter';

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
		this.state={email:'', password:'', username:'', redirect: false, isMounted: false};
		//user input
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
	    .post('/api/auth/login ', payload, {withCredentials: true})
	    .then(response =>
    	  	{
	    	  	if(response.status === 200)
	    	  	{
 					this.setState({username: response.data});
 					console.log("login successful " + response.status); 
 					this.props.setLoggedInCallback(true, this.state.username);
 				}
		  	})
	    .catch(err => 
	    	{
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
					</form>
		    </Box>
		);
	}
}

export default Login;