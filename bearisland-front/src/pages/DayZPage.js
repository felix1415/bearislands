import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import BespokeTempFont from '../utils/BespokeTempFont'
import dayZFontImport from '../assets/28-Days-Later.woff'

//https://cdn.battlemetrics.com/b/standardVertical/4900472.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300

export default function DayZ() {
	return (
		<Box my={4}>
			<BespokeTempFont
				fontImport={dayZFontImport}
				targetComponent={
		            <Typography variant="h1" style={{textAlign: "center"}}>
		              Bear Island Rust
		            </Typography>
	          }> 
			</BespokeTempFont>  
	    </Box>
	);
}