import React from 'react';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router-dom'

// const config = require('../config');

class Admin extends React.Component
{
    // constructor(props)
    // {
    //     super(props);

    // }

    render()
    {
        if(!this.props.loggedIn)
        {
            return <Redirect to='/' />;
        }
        return (
            <Box my={4}>
                    Admin Dashboard
            </Box>
        );
    }
    
}

export default Admin;