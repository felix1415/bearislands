import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile  from '@material-ui/core/GridListTile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
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

function MessageOriginIsThisEmail(props)
{
    console.log(":::::   " + props.messageEmail + "    " + props.userEmail);
    if(props.messageEmail === props.userEmail)
    {
        return <Grid item xs={3}></Grid>;
    }
    return <Grid item xs={0}></Grid>
}

function MineOrTheresPaper(props)
{
    if(props.messageEmail === props.userEmail)
    {
        return <Paper key={props.value._id} className={props.classes.theirs}>
                    {React.cloneElement(props.element, {
                        key: props.value._id,
                        primary: props.value.message,
                        secondary: props.value.date
                        })}
                    </Paper>
    }
    return <Paper key={props.value._id} className={props.classes.mine}>
            {React.cloneElement(props.element, {
                key: props.value._id,
                primary: props.value.message,
                secondary: props.value.date
                })}
            </Paper>

}

function     GenerateChat(props) {
    const classes = useStyles();
    return JSON.parse(props.messages).map((value) =>
        <ListItem key={value._id}>
            <MessageOriginIsThisEmail messageEmail={props.email} userEmail={value.email}/>
            <Grid key={value._id} item xs={9}>
                <GridListTile key={value._id} cols={1} rows={1}>
                    <MineOrTheresPaper value={value} element={props.element} classes={classes} messageEmail={props.email} userEmail={value.email}/>
                </GridListTile>

            </Grid>
            
        </ListItem>
    );
}


class ChatWindow extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {email: '', messages: '', uuid: this.props.match.params.uuid, validId: false, sentMessage: false}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit(event)
    {
        event.preventDefault();
        var payload = {
            "email":this.state.email,
            "uuid":this.state.uuid,
            "message":this.state.message
        }
        axios
        .post(config.apiServer + config.serverPort + '/contact/newMessage ', payload)
        .then(response =>
            {
                if(response.status === 200)
                {
                    console.log("sent message successfully " + response.status); 
                    this.setState({sentMessage: true});
                }
            })
        .catch(err => 
            {
                console.error("newMessage failed: " + err);
            });         
    }

    componentDidMount()
    {
        axios
        .get(config.apiServer + config.serverPort + '/contact/getAllMessages', {
            params: {
              uuid: this.state.uuid
            }
          })
        .then(response =>
            {
                console.log(JSON.stringify(response));
                console.log("got convo back successfully " + response);
                if(response.status === 200)
                {
                    this.setState({'messages': JSON.stringify(response.data)});
                    this.setState({email: "alexgray1415@gmail.com"});
                }
            })
        .catch(err => 
            {
                console.error("sending message failied: " + err);
            });     
        //mine on the right, there's on the left
    }



    render()
    {
        if(!this.state.messages)
        {
            return (<Typography variant="h6">
                        Bearisland Private Chat
                    </Typography>);
        }

        return (
            <Box my={1}>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Bearisland Private Chat
                        </Typography>
                        <GridList cellHeight={300} cols={1}>
                            <List height={400} width={300} itemSize={46} > {/* dense={dense}*/}
                                <Grid container >
                                    <GenerateChat messages={this.state.messages} element={<ListItemText/>} email={this.state.email}/>
                                </Grid>
                            </List>
                        </GridList>
                    </Grid>
                    <Grid container direction="row" alignItems="center" >
                        <Grid item xs={9}>
                            <TextField multiline id="standard-basic" label="Message" fullWidth={true}/>
                        </Grid>
                        <Grid item xs={3}>
                            <form onSubmit={this.handleSubmit}>
                                <Button type="submit" variant="contained" label="Send" primary="true">Submit</Button>
                            </form>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        );
    }

}

export default withRouter(ChatWindow) ;