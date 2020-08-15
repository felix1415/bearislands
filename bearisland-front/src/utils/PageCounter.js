import React from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const config = require('../config');

class PageCounter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {name: this.props.name, counters: ''}
    }

    getCounters()
    {
        axios
        .get(config.apiServer + config.serverPort + '/admin/getCounters')
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
                console.error("getting messages failied: " + err);
            });
    }

    updateCounter()
    {
        console.log("about to send: " + this.state.name);
        this.scrollToMyBottomOfChat();
        var payload = {
            "counter":this.state.name
        }
        axios
        .post(config.apiServer + config.serverPort + '/contact/newMessage ', payload)
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.setState({sentMessage: true});
                }
            })
        .then(response =>
        {
            this.getAllMessages();
        })
        .catch(err => 
        {
            console.error("newMessage failed: " + err);
        });   
    }

    render()
    {
        if(!this.props.read)
        {
            return <div/>;
        }
        return (
            <Box my={4}>
            <Typography variant="h6" gutterBottom>
                    Admin Dashboard
            </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            Counters
                        </Grid>
                    </Grid>
            </Box>
        );
    }
    
}

export default PageCounter;