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

        this.updateCounter = this.updateCounter.bind(this);
        this.getCounters = this.getCounters.bind(this);
    }

    getCounters()
    {
        axios
        .get('/api/admin/getCounters')
        .then(response =>
        {
            console.log(JSON.stringify(response));
            // console.log("got counters back successfully " + response);
            // if(response.status === 200)
            // {
            //     this.setState({'counters': JSON.stringify(response.data)});
            // }
        })
        .catch(err => 
        {
            console.error("getting counters failed: " + err);
        });
    }

    updateCounter()
    {
        console.log("about to send: " + this.state.name);
        var payload = {
            "counterName":this.state.name
        }
        axios
        .post('/api/counters', payload)
        .then(response =>
        {
            if(response.status === 200)
            {
                console.log("loaded page " + this.state.name);
            }
        })
        .catch(err => 
        {
            console.error("sending counters failed: " + err);
        }); 
    }

    render()
    {
        if(!this.props.read)
        {
            this.updateCounter();
            return <div/>;
        }
        console.log("get the counters");
        // this.getCounters();
        return (
            <Box my={4}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        Counters - none added yet.
                    </Grid>
                </Grid>
            </Box>
        );
    }
    
}

export default PageCounter;