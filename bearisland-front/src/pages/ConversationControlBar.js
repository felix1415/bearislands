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

class ConversationControlBar extends React.Component
{

    constructor(props)
    {
        super(props);

        this.archiveChat = this.archiveChat.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
        this.unArchiveChat = this.unArchiveChat.bind(this);
        this.sendReminder = this.sendReminder.bind(this);

    }

    archiveChat(event)
    {
        event.preventDefault();
        this.props.archiveChatCallback();
    }

    unArchiveChat(event)
    {
        event.preventDefault();
        this.props.unArchiveChatCallback();
    }

    deleteChat(event)
    {
        event.preventDefault();
        this.props.deleteChatCallback();
    }

    sendReminder(event)
    {
        event.preventDefault();
        this.props.sendReminderCallback();
    }

    render()
    {
        if(!this.props.uuid)
        {
            return <Box my={1} />;
        }

        let button;
        if(this.props.chatIsArchived)
        {
            button = <Button variant="contained" onClick={this.deleteChat}>Delete Chat</Button>
        }
        else
        {
            button = <Button variant="contained" onClick={this.archiveChat}>Archive Chat</Button>
        }

        return (
            <Box m={2} r={5}>
                <Grid container spacing={2}>
                        {button}

                        {(this.props.chatIsArchived) &&
                            <Button variant="contained" onClick={this.unArchiveChat}>Unarchive Chat</Button>
                        }
                        {(!this.props.chatIsArchived) &&
                            <Button variant="contained" onClick={this.sendReminder}>Send Reminder</Button>
                        }
                </Grid>
            </Box>
        );
    }

}

export default ConversationControlBar;