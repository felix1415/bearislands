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
import ConversationControlBar from './ConversationControlBar';
import Snackbar from '@material-ui/core/Snackbar';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';

const config = require('../config');

class ConversationComp extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {conversations: '', uuid: '', showArchivedMessages: false, archiveThisChat: false, openSnack: false, userEmail:''}

        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.getAllConversations = this.getAllConversations.bind(this);
        this.swapLists = this.swapLists.bind(this);
        this.archiveCall = this.archiveCall.bind(this);
        this.archiveChat = this.archiveChat.bind(this);
        this.unArchiveChat = this.unArchiveChat.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
        this.sendReminder = this.sendReminder.bind(this);       
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.setUserEmail = this.setUserEmail.bind(this);
    }

    closeSnackbar (event, reason)
    {
        this.setState({openSnack: false});
    }

    setUserEmail(userEmailIn)
    {
        this.setState({userEmail: userEmailIn});
    }

    handleListItemClick(event, uuidIn, archive)
    {
        event.preventDefault();
        this.setState({'uuid': uuidIn});
        this.setState({'archiveThisChat': archive});
        this.getAllConversations();
        // this.set
    }

    //currentTarget from material ui buttons
    swapLists(event)
    {
        console
        event.preventDefault(); 
        this.setState({'uuid': ''});
        this.setState({'archiveThisChat': false});
        if(event.currentTarget.value === "archived")
        {
            this.setState({'showArchivedMessages': true}, () => { this.getAllConversations(); })
        }
        else
        {
            this.setState({'showArchivedMessages': false}, () => { this.getAllConversations(); })
        }

        // this.getAllConversations();
    }

    getAllConversations()
    {
        console.log("Getting conversations")
        var apiMethod = '/admin/';

        if(this.state.showArchivedMessages)
        {
            console.log("getting archived conversations");
            apiMethod = apiMethod.concat("getAllArchivedConversations");
        }
        else
        {
            apiMethod = apiMethod.concat("getAllConversations");
        }

        console.log(apiMethod)

        axios
        .get(config.apiServer + config.serverPort + apiMethod, {withCredentials: true})
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

    archiveCall(archive)
    {
        var payload = {
            "uuid":this.state.uuid,
        }

        var apiMethod = '/admin/';

        if(archive)
        {
            apiMethod = apiMethod.concat("archiveChat");
        }
        else
        {
            apiMethod = apiMethod.concat("unArchiveChat");
        }

        axios
        .post(config.apiServer + config.serverPort + apiMethod, payload, {withCredentials: true})
        .then(response =>
        {
            if(response.status === 200)
            {
                console.log("sent message successfully " + response.status);
                // this.getAllConversations();
            }
        })
        .catch(err => 
        {
            console.error("sending message failied: " + err);
        }); 
    }

    archiveChat()
    {
        this.setState({'archiveThisChat': true}, () => { this.archiveCall(true); });
        //send command
    }

    unArchiveChat()
    {
        this.setState({'archiveThisChat': false}, () => { this.archiveCall(false); });
        //send command
    }

    deleteChat()
    {
        var payload = {
            "uuid":this.state.uuid,
        }
        
        axios
        .post(config.apiServer + config.serverPort + '/admin/removeChat', payload, {withCredentials: true})
        .then(response =>
        {
            if(response.status === 200)
            {
                console.log("sent message successfully " + response.status);
            }
        })
        .catch(err => 
        {
            console.error("sending message failied: " + err);
        }); 
        this.setState({'uuid': ''});
        this.setState({'archiveThisChat': false}, () => { this.getAllConversations(false); });
    }

    sendReminder()
    {
        this.setState({openSnack: true});
        console.log("HELLO")
        //snackbar
        //send command
    }

    componentDidMount()
    {
        this.getAllConversations();
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
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={2}>
                                <Button variant="contained" value="archived" onClick={this.swapLists}>View Archived Messages</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" value="current" onClick={this.swapLists}>View Current Messages</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <List component="nav" aria-label="conversation selector">
                            {JSON.parse(this.state.conversations).map((convo) => (
                                <ListItem button key={convo._id} onClick={(event) => this.handleListItemClick(event, convo._id, convo.archive)} >
                                    <ListItemText primary={
                                                           <React.Fragment>
                                                               <Typography
                                                                variant="h6"
                                                                color="texPrimary"
                                                              >
                                                                {convo.subject}
                                                              </Typography>
                                                          </React.Fragment>} 
                                                  secondary={
                                                          <React.Fragment>
                                                              <Typography
                                                                variant="body1"
                                                                color="textSecondary"
                                                              >
                                                                {convo.email}
                                                              </Typography>

                                                              <Typography
                                                                variant="body2"
                                                                color="textSecondary"
                                                                noWrap="true"
                                                              >
                                                                {convo.message}
                                                              </Typography>
                                                        </React.Fragment>
                                                            }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <ChatWindow errorMessage={"No chat selected"} uuid={this.state.uuid} email={this.props.email} setUserEmailCallback={this.setUserEmail}/>
                        <ConversationControlBar uuid={this.state.uuid} 
                                                chatIsArchived={this.state.archiveThisChat}
                                                archiveChatCallback={this.archiveChat}
                                                unArchiveChatCallback={this.unArchiveChat}
                                                deleteChatCallback={this.deleteChat}
                                                sendReminderCallback={this.sendReminder}
                                                />
                    </Grid>
                </Grid>
                <Snackbar
                  autoHideDuration={5000}
                  open={this.state.openSnack}
                  onClose={this.closeSnackbar}
                  message={"Sent email to user " + this.state.userEmail + " to notify them of new messages"}
                />

            </Box>
        );
    }

}

export default ConversationComp;