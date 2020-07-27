import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  responsive_image: {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
},
}));

export default function ResponsiveImage( { src, alt="image does not have an alt prop", width, height } ) {
  const classes = useStyles();
  return (
    <div style={{ width, maxWidth: "100%", position: "relative"}}>
      <div style={{ paddingBottom: ( height / width * 100 ) + '%' }} />
      <img src={ src } alt={alt} className={classes.responsive_image} />
    </div>
  );
}