import React from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import GridListTile  from '@material-ui/core/GridListTile';

const config = require('../config');

// function     GenerateCounterDisplay(props) {
//     const classes = useStyles();
//     return JSON.parse(props.data).map((value) =>
//         <GridListTile key={value._id} cols={1} rows={1}>
//             <Paper elevation={3}>
//                 {React.cloneElement(props.element, {
//                 key: props.value._id,
//                 primary: props.value.counterName,
//                 secondary: props.value.count
//                 })}
//             </Paper>
//         </GridListTile>
//     );
// }

class PageCounter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {name: this.props.name}

        this.updateCounter = this.updateCounter.bind(this);
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
        if(this.props.data)
        {
            return (
                <Box my={4}>
                    <Grid container spacing={4}>
                        {JSON.parse(this.props.data).map((counter) => (
                        <Grid item xs={3} >
                                <Typography gutterBottom variant="h6">
                                    {counter.counterName}: {counter.count}
                                </Typography>
                        </Grid>
                        ))}
                    </Grid>
                </Box>
                );
        }
        else
        {
            if(this.props.name)
            {
                this.updateCounter();
            }
        }
        return (
            <Box my={4}>
            </Box>
        );
    }
    
}

export default PageCounter;