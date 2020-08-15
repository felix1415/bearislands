import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe'
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';

import ResponsiveImage from '../utils/ResponsiveImage';

import BespokeTempFont from '../utils/BespokeTempFont'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme} from '@material-ui/core/styles';
import dayZFontImport from '../assets/28-Days-Later.woff'

import dayzimgone from '../assets/image_folder/dayz/helicopter.png';
import dayzimgtwo from '../assets/image_folder/dayz/villageview.png';
import dayzimgthree from '../assets/image_folder/dayz/zombies.png';
import dayzimgfour from '../assets/image_folder/dayz/helicopter2.png';

//https://cdn.battlemetrics.com/b/standardVertical/4900472.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300

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

export default function DayZ() {
	const classes = useStyles();
	const theme = createMuiTheme();
	return (
		<Box my={4}>
			<BespokeTempFont
				fontImport={dayZFontImport}
				targetComponent={
		            <Typography variant="h1" style={{textAlign: "center"}}>
		              Bear Island DayZ
		            </Typography>
	          }> 
			</BespokeTempFont>  
			<Typography variant="h6" className={classes.paper} gutterBottom>
				[EU/UK] Bear Island | No BP Wipes | Low Upkeep | Max 4 per group | Monthly Map
    		</Typography>

			<Grid container spacing={4}>
				<Hidden only={['sm', 'xs']}>
					<Grid item xs={3}>
				  		<Iframe src="https://cdn.battlemetrics.com/b/standardVertical/4900472.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300" 
				        name="jwtpo"
				        height="400px"
				        width="200px" />
				    {/*Hegiht can be played with once we know the general size of the rules and server info on this page*/}
					</Grid>
				</Hidden>
				<Grid item xs={9}>
					<Grid container spacing={4}>
						<Hidden only={['sm', 'xs']}>
						<Grid item xs={6}>
							<ResponsiveImage src={dayzimgone} alt="kitten1" width="711" height="400" />
						</Grid>
						</Hidden>
						<Grid item xs={6}>
							<ResponsiveImage src={dayzimgtwo} alt="kitten2" width="711" height="400" />
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
			  					</ul>
				  			</Typography>
				  		</Grid>
						<Grid item xs={6}>
							<ResponsiveImage src={dayzimgthree} alt="kitten2" width="711" height="400" />
						</Grid>
						<Grid item xs={6}>
							<ResponsiveImage src={dayzimgfour} alt="kitten2" width="711" height="400" />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
	    </Box>
	);
}