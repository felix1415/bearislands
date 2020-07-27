import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import ServerGridList from '../ServerGrid';

export default function Home() {

	return (
		<Box my={4}>
	        <Typography variant="h2" gutterBottom>
	          Bear Island Servers
	        </Typography>
	        <Typography variant="h6" gutterBottom>
	          Explore, survicve and thrive. The best surivavl based experiences happen on Bear Island.
	        </Typography>

	        <Grid container direction="row" justify="center" alignItems="center">
	          <ServerGridList />
	        </Grid>
	    </Box>

		);

}