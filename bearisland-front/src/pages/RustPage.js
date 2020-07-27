import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';

import ResponsiveImage from '../utils/ResponsiveImage';

//font stuff
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme} from '@material-ui/core/styles';
import BespokeTempFont from '../utils/BespokeTempFont'

//images
import shotguns from '../assets/image_folder/shotguns.png';
import bears from '../assets/image_folder/bears.png';
import rockets from '../assets/image_folder/rockets.png';
import rockets2 from '../assets/image_folder/rockets2.png';

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
		            <Typography variant="h1" style={{textAlign: "center"}}>
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
				  		<Iframe src="https://cdn.battlemetrics.com/b/standardVertical/2910904.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=700" 
				        name="jwtpo"
				        height="1020px"
				        width="200px" />
				    {/*Hegiht can be played with once we know the general size of the rules and server info on this page*/}
					</Grid>
				</Hidden>
				<Grid item xs={9}>
					<Grid container spacing={4}>
						<Hidden only={['sm', 'xs']}>
						<Grid item xs={6}>
							<ResponsiveImage src={rockets} alt="kitten1" width="711" height="400" />
						</Grid>
						</Hidden>
						<Grid item xs={6}>
							<ResponsiveImage src={bears} alt="kitten2" width="711" height="400" />
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
				  					<li>Max 4 Players per Group. Please report any abuse alongside video/screenshot evidence to EMAILLINKHERE</li>
			  					</ul>
				  			</Typography>
				  		</Grid>
						<Grid item xs={12}>
							<ResponsiveImage src={shotguns} alt="kitten2" width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				Grouping Rules
					  			</Typography>
				  			</Paper>
				  			<Typography variant="body1">
				  				<ul>
				  					<li>Max 4 players per group. Max 4 per base / compound. </li>
				  					<li>Conducting any activity with more than 4 people, OR which utilises the resources of more than 4 people cumulatively – such as pooling resources for the purposes of raiding, is NOT ALLOWED and will earn you a ban. </li>
				  					<li>Multi-group alliances are not permitted, and you must build at least ONE FULL MAP GRID AWAY from other groups that you are already familiar with. </li>
				  					<li>Changing teams’ mid-wipe is permissible – but only within reason. </li>
				  					<li>If in doubt – stick within your team & you won’t have any issues.</li>
			  					</ul>
				  			</Typography>
				  		</Grid>
						<Grid item xs={6}>
							<ResponsiveImage src={shotguns} alt="kitten2" width="711" height="400" />
						</Grid>
						<Grid item xs={6}>
							<ResponsiveImage src={rockets2} alt="kitten2" width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				Building Rules
					  			</Typography>
				  			</Paper>
				  			<Typography variant="body1">
				  				<ul>
				  				 	<li>No Building Inside, or Blocking Off Monuments - Including Quarries! </li>
				  				 	<li>Building large bases across main roads or directly overlooking monuments / quarries is still considered 'blocking'.</li>
				  				 	<li>Building inside caves IS ALLOWED. </li>
				  				 	<li>Please do not build within ONE FULL MAP GRID of the outer edge of Outpost, Bandit Camp or the Large Excavator. </li>
			  					</ul>
				  			</Typography>
				  		</Grid>
						<Grid item xs={12}>
							<ResponsiveImage src={shotguns} alt="kitten2" width="711" height="400" />
						</Grid>
						<Grid item xs={12}>
				  			<Paper className={classes.paper}>
					  			<Typography variant="h4" >
					  				Frequently Asked Questions
					  			</Typography>
				  			</Paper>

				  			<Typography variant="h6">
				  				Can I be admin?
				  			</Typography>
				  			<Typography variant="body2" className={classes.tab}>
				  				No, fuck off
				  			</Typography>
				  		</Grid>
						<Grid item xs={6}>
							<ResponsiveImage src={shotguns} alt="kitten2" width="711" height="400" />
						</Grid>
						<Grid item xs={6}>
							<ResponsiveImage src={rockets2} alt="kitten2" width="711" height="400" />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
	    </Box>
	    </Container>
	);
}