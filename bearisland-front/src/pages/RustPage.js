import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';

import ResponsiveImage from '../utils/ResponsiveImage';
import PageCounter from '../utils/PageCounter';

//font stuff
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme} from '@material-ui/core/styles';
import BespokeTempFont from '../utils/BespokeTempFont'

//images
import desert_fight from '../assets/image_folder/desert_fight.png';
import bears from '../assets/image_folder/bears.png';
import rockets from '../assets/image_folder/rockets.png';
import rockets2 from '../assets/image_folder/rockets2.png';
import village from '../assets/image_folder/village.png';
import dodomall from '../assets/image_folder/dodomall_one.png';
import horses from '../assets/image_folder/rust-horses-bases.png';
import deadak from '../assets/image_folder/dead-ak-player.png';
import twonakeds from '../assets/image_folder/two-nakeds-cottage.png';

import rustFontImport from '../assets/Rust.woff';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  tab: {
  	marginLeft: "40px",
  },
}));


export default function Rust() {
	const classes = useStyles();
	const theme = createMuiTheme();

	return (
		<Container fixed>
		<Box my={4}>

			<BespokeTempFont
				fontImport={rustFontImport}
				targetComponent={
		            <Typography variant="h4" style={{textAlign: "center"}}>
		              Bear Island Rust
		            </Typography>
              }> 
			</BespokeTempFont>

			<Typography variant="h6" className={classes.paper} gutterBottom>
				[EU/UK] Bear Island | No BP Wipes | Low Upkeep | Max 4 per group | Monthly Map
    		</Typography>

			<Grid container spacing={4}>
				<Hidden only={['sm', 'xs']}>
					<Grid item xs={3}>
				  		<Iframe src="https://cdn.battlemetrics.com/b/standardVertical/9187010.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=700" 
				        name="jwtpo"
				        height="1020px"
				        width="200px" />
				    {/*Hegiht can be played with once we know the general size of the rules and server info on this page*/}
					</Grid>
				</Hidden>
				<Grid item xs>
					<Grid container spacing={4}>
						<Hidden only={['sm', 'xs', 'md']}>
							<Grid item xs={6}>
								<ResponsiveImage src={rockets} width="711" height="400" />
							</Grid>
						</Hidden>
						<Grid item xs>
							<ResponsiveImage src={desert_fight} width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				General Server Rules & Info
					  			</Typography>
				  			</Paper>
				  			<Typography variant="subtitle1" style={{padding: theme.spacing(2)}}>
				  				Welcome to Bear Island
				  			</Typography>
				  			<Typography variant="body1">
				  				<ul>
				  					<li>No Cheating, exploitation or related bad bitchery</li> 
				  					<li>No abusive behaviour including Racism, Extremism - or any of the other bad isms</li>
				  					<li>No Building Inside, or Blocking Off Monuments - Including Quarries</li>
				  					<li>No giving Bases or main loot away</li>
				  					<li>Max 4 Players per Group. Please report any abuse alongside video/screenshot evidence using our contact form</li>
			  					</ul>
				  			</Typography>
				  		</Grid>
						<Grid item xs={12}>
							<ResponsiveImage src={bears} width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				Grouping Rules
					  			</Typography>
				  			</Paper>
				  			<Typography variant="body1">
				  				<ul>
				  					<li>Max 4 players per group. Max 4 per Base / TC / Codelock / Compound. </li>
				  					<li>Neutrality between groups is permitted - Alliances are not. </li>
				  					<li>Further, you must build at least ONE FULL MAP GRID AWAY from other groups that you are already familiar with.</li>
				  					<li>Changing teams’ mid-wipe is permissible – but only within reason. </li>
				  					<li>If in doubt – contact admin.</li>
			  					</ul>
				  			</Typography>
				  		</Grid>
				  		<Hidden only={['sm', 'xs', 'md']}>
						<Grid item xs={6}>
							<ResponsiveImage src={horses}  width="711" height="400" />
						</Grid>
						</Hidden>
						<Grid item xs>
							<ResponsiveImage src={dodomall} width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				Building Rules
					  			</Typography>
				  			</Paper>
				  			<Typography variant="body1">
				  				<ul>
				  				 	<li>No building inside or blocking off Monuments - Including Quarries!</li>
				  				 	<li>Building inside caves IS ALLOWED. </li>
				  				 	<li>Please do not build within ONE FULL MAP GRID of the outer edge of Outpost, Bandit Camp </li>
				  				 	<li>Do not use bases to roof camp / snipe into monuments. </li>
			  					</ul>
				  			</Typography>
				  		</Grid>
						<Grid item xs={12}>
							<ResponsiveImage src={village} width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				Frequently Asked Questions
					  			</Typography>
				  			</Paper>

				  			<Typography variant="h5">
				  				Can I switch teams mid wipe, or add a new player mid wipe?
				  			</Typography>
				  			<Typography variant="body2" className={classes.tab}>
				  				Only in the circumstance where part of your team has left the server or you have a free slot. Two duos can make a full 4 man team too, but you must stick together. 
				  			</Typography>
				  			<Typography variant="h5">
				  				Can I build a village?
				  			</Typography>
				  			<Typography variant="body2" className={classes.tab}>
				  				In previous wipes we've allowed it, however it usually gets very messy on the over teaming side so we don't allow people to primitively build next to each other while over teaming.
				  			</Typography>
				  			<Typography variant="h5">
				  				Can I (a solo) build next to my duo friends?
				  			</Typography>
				  			<Typography variant="body2" className={classes.tab}>
				  				Yes you can, you can even base with them. You can't however build next to them if your friends are in a full team. You should play a different server if you want to play with more than 4 players.
				  			</Typography>
				  			<Typography variant="h5">
				  				I think someone is cheating, what should I do
				  			</Typography>
				  			<Typography variant="body2" className={classes.tab}>
				  				If you think someone is cheating try and record it either with video capture or screenshots, we review all cases dilligently and ban players we think are certain of cheating. We won't ban players that are 'suspect' without hard evidence against them.
				  			</Typography>
				  		</Grid>
						<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
							<ResponsiveImage src={deadak} alt="kitten2" width="711" height="400" />
						</Grid>
						<Hidden only={['sm', 'xs', 'md']}>
							<Grid item xs={6}>
								<ResponsiveImage src={twonakeds} alt="kitten2" width="711" height="400" />
							</Grid>
						</Hidden>
					</Grid>
				</Grid>
			</Grid>
			<PageCounter name="rust" />
	    </Box>
	    </Container>
	);
}