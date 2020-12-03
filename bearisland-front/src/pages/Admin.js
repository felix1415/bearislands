import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import PageCounter from '../utils/PageCounter'
import ConversationComp from '../pages/ConversationComp'
import axios from 'axios';
// const config = require('../config');

class Admin extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {counters:''}

        this.getCounters = this.getCounters.bind(this);
    }


    getCounters()
    {
        console.log("this is where the admin gets the counters manually")
        axios
        .get('/api/admin/getCounters')
        .then(response =>
        {
            console.log(JSON.stringify(response));
            console.log("got counters back successfully " + response);
            if(response.status === 200)
            {
                this.setState({'counters': JSON.stringify(response.data)});
            }
        })
        .catch(err => 
        {
            console.error("getting counters failed: " + err);
        });
    }

    render()
    {
        if(!this.props.loggedIn)
        {
            return <Redirect to='/' />;
        }

        if(!this.state.counters)
        {
            // this.getCounters();
        }

        return (
            <Box my={4}>
            <Typography variant="h6" gutterBottom>
                    Admin Dashboard
            </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <PageCounter data={this.state.counters}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ConversationComp email={this.props.email}/>
                        </Grid>
                    </Grid>
            </Box>
        );
    }
    
}

export default Admin;