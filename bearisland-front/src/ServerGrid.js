import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {tileData} from './assets/gameServers.js';
import ResponsiveImage from './utils/ResponsiveImage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RLink
} from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: 1000,
//     height: 200,
//   },
//   icon: {
//     color: 'rgba(255, 255, 255, 0.4)',
//   },
//   link: {
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

const useStyles = makeStyles({
  media: {
    height: 400,
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ServerGridList() {
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();

  //do some on click for the image and for the info icon - diff stuff on each

  return (
    <Router>
      <div className={classes.root}>
        <Grid container spacing={1}>
          {tileData.map((tile) => (
            <Grid item xs={12} >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={tile.img}
                    title={tile.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {tile.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {tile.subtitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" size="small" color="primary" href={tile.link}>
                    Connect
                  </Button>
                </CardActions>
              </Card>
            </Grid>



          ))}
        </Grid>
      </div>
    </Router>
  );
}