import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile  from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ChatWindow from './ChatWindow';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';

const config = require('../config');

const useStyles = makeStyles({
  mine: {
    background: 'linear-gradient(45deg, #3b59F8 30%, #3b59ff 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(66, 103, 178, .3)',
    color: 'white',
    padding: '0 10px',
    wordWrap: 'break-word',
  },
  theirs: {
    background: 'linear-gradient(45deg, #202020 30%, #202020 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(66, 103, 178, .3)',
    color: 'white',
    secondary: 'red',
    padding: '0 10px',
    wordWrap: 'break-word',
  },
});

class ConversationComp extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {conversations: ''}

        this.handleChange = this.handleChange.bind(this);
        this.getAllConversations = this.getAllConversations.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    getAllConversations()
    {
        axios
        .get(config.apiServer + config.serverPort + '/admin/getAllConversations')
        .then(response =>
            {
                console.log(JSON.stringify(response));
                console.log("got convo back successfully " + response);
                if(response.status === 200)
                {
                    this.setState({'conversations': JSON.stringify(response.data)});
                }
            })
        .catch(err => 
        {
            console.error("getting conversations failied: " + err);
        });
    }

    componentDidMount()
    {
        this.getAllConversations();
        //mine on the right, there's on the left
    }

    render()
    {
        if(!this.state.conversations)
        {
            return (<Typography variant="h6">
                        No Messages
                    </Typography>);
        }

        return (
            <Box my={1}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        Message List
                    </Grid>
                    <Grid item xs={8}>
                        <ChatWindow />
                    </Grid>
                </Grid>
            </Box>
        );
    }

}

export default ConversationComp;