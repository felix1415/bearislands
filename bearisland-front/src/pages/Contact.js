import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';

const config = require('../config');

// function ContactForm(props)
// {
//     <form onSubmit={this.handleSubmit}>
// 		<TextField
// 			name="email"
// 			label="Email"
//         	onChange={this.handleChange}
//          />
//        	<br/>
//        	<br/>
//        	<TextField
//        		name="subject"
//        		label="Subject"
//         	onChange={this.handleChange}
//            />
//         <br/>
//         <br/>
//         <TextareaAutosize name="message" aria-label="minimum height" rowsMin={3} placeholder="Message" onChange={this.handleChange} />
//     	<Button type="submit" variant="contained" label="Submit" primary="true">Submit </Button>
// 	</form>
// }


class Contact extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {email: '', subject: '', message: '', sentMessage: false}

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
			"subject":this.state.subject,
			"message":this.state.message
 		}
 		axios
	    .post(config.apiServer + config.serverPort + '/contact/initialMessage ', payload)
	    .then(response =>
    	  	{
	    	  	if(response.status === 200)
	    	  	{
 					console.log("sent message successfully " + response.status); 
 					this.setState({sentMessage: true});
 				}
		  	})
	    .catch(err => 
	    	{
	      		console.error("sending message failied: " + err);
	    	}); 		
	}

	render()
	{
		if(this.state.sentMessage)
		{
			return <Typography variant="h6" gutterBottom>Thank you for your message. We'll send you an email when the admin team has replied.</Typography>
		}
		return (
			<Box my={4}>
		        <Typography variant="h2" component="h1" gutterBottom>
		        	Contact 
		        </Typography>
		        <Typography variant="h5" gutterBottom>
		        	Got a problem? Have a suggestion? Get in contact with the admin team easily. Use a valid email so we can reply back to you. (Contact form coming soon).
		        </Typography>
		        <div/>
		        <br/>


		        <CopyToClipboard text="BearPatrol.BearIsland@Gmail.com">
	            	<Button>Copy email to clipboard</Button>
	          </CopyToClipboard>
		    </Box>
		);
	}

}

export default Contact;