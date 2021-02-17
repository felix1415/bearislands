import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import PageCounter from '../utils/PageCounter'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ConversationComp from '../pages/ConversationComp'
import axios from 'axios';
// const config = require('../config');

class Admin extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {counters:'', loadedCounters: false, emailNotifications: false}

        this.getCounters = this.getCounters.bind(this);
        this.setLoadedConversationComp = this.setLoadedConversationComp.bind(this);
        this.setEmailNotificationsChecked = this.setEmailNotificationsChecked.bind(this);
        this.getEmailNotificationsChecked = this.getEmailNotificationsChecked.bind(this);
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
                this.setState({'loadedCounters': true});
                this.setState({'counters': JSON.stringify(response.data)});
            }
        })
        .catch(err => 
        {
            console.error("getting counters failed: " + err);
        });
    }

    setEmailNotificationsChecked(event)
    {
        this.setState({'emailNotifications': event.target.checked});
        console.log(event.target.checked);
        var payload = {
            "emailNotifications": this.state.emailNotifications
        }
        axios
        .post('/api/admin/emailNotifications', payload)
        .then(response =>
        {
            if(response.status === 200)
            {
                console.log("successfully set email emailNotifications to " + this.state.emailNotifications);
            }
        })
        .catch(err => 
        {
            console.error("sending counters failed: " + err);
        }); 
    }

    getEmailNotificationsChecked()
    {
        if(this.state.emailNotifications)
        {
            return;
        }
        axios
        .get('/api/admin/emailNotifications')
        .then(response =>
        {
            console.log(JSON.stringify(response));
            console.log("got emailNotifications back successfully " + response);
            if(response.status === 200)
            {
                this.setState({'emailNotifications': JSON.stringify(response.data)});
            }
        })
        .catch(err => 
        {
            console.error("getting emailNotifications failed: " + err);
        });
    }

    setLoadedConversationComp(loaded)
    {
        this.setState({ loadedConversationComp: loaded });
    }

    render()
    {
        if(!this.props.loggedIn)
        {
            return <Redirect to='/' />;
        }

        if(this.state.loadedConversationComp)
        {
            if(!this.state.counters && !this.state.loadedCounters)
            {
                this.getCounters();
            }

            if(this.state.loadedCounters && !this.state.loadedEmailNotifications)
            {
                this.getEmailNotificationsChecked();
                this.setState({'loadedEmailNotifications': true});
            }
        }

        return (
            <Box my={4}>
            <Typography variant="h6" gutterBottom>
                    Admin Dashboard
            </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.emailNotifications}
                                    onChange={this.setEmailNotificationsChecked}
                                    name="checkedB"
                                    color="primary"
                                  />
                                }
                                label="Get email Notifications"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PageCounter data={this.state.counters}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ConversationComp email={this.props.email} loadedCallback={this.setLoadedConversationComp}/>
                        </Grid>
                    </Grid>
            </Box>
        );
    }
    
}

export default Admin;