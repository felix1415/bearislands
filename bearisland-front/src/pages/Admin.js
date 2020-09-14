import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import PageCounter from '../utils/PageCounter'
import ConversationComp from '../pages/ConversationComp'

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
            <Typography variant="h6" gutterBottom>
                    Admin Dashboard
            </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            Counters
                            <PageCounter read={true}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ConversationComp />
                        </Grid>
                    </Grid>
            </Box>
        );
    }
    
}

export default Admin;