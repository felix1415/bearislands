import React from 'react';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

const config = require('../config');

class Logout extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {'redirect': false}
        
        if(props.loggedIn)
        {
            this.props.setLoggedInCallback(false);
        }

        localStorage.clear();
    }

    componentDidMount(){
        axios.get(config.apiServer + config.serverPort + '/auth/logout', {withCredentials: true})
        .then(response =>
            {
                console.log("logged out successfully")
            })
        .catch(err => {
            console.error(err);
        });
    }

    render()
    {
        if(!this.props.loggedIn)
        {
            return <Redirect to='/' />;
        }
        if(this.state.redirect)
        {
            return <Redirect to='/' />;
        }
        return (
            <Box my={4}>
                    You have been logged out.
            </Box>
        );
    }
    
}


export default Logout;