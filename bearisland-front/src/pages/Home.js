import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import ServerGridList from '../ServerGrid';

export default function Home() {

	return (
		<Container fixed>
			<Box my={4}>

				<Grid container spacing={2}>
					<Grid item xs={12}>
				        <Typography variant="h2" gutterBottom>
				          Bear Island Servers
				        </Typography>
			        </Grid>
			        <Grid item xs={12}>
				        <Typography variant="h6" gutterBottom>
				        	Explore, survive and thrive. The best survial experiences happen on Bear Island.
				        </Typography>
			        </Grid>
			        
			        <ServerGridList />

			        
		        </Grid>
		    </Box>
	    </Container>

		);

}