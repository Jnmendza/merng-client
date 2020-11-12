import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {  Box, Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';

import Slider from 'infinite-react-carousel';

import Yellow from '../images/yellow.png';
import Red from '../images/red.png';
import Green from '../images/green.png'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
        height: '270px',
        width: '270px',
        margin: 'auto'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: 'red[500]',
    },
    card: {
        maxWidth: 350,
        maxHeight: 800,
    }
  }));
  
  const settings = {
      dots: true,
      initialSlide: true,
      autoplay: true,
      adaptiveHeight: true,
      maxWidth: 345,
      arrows: false,
      arrowsBlock: false,
      duration: 100,
  }

export const Carousel = () => {
    const classes = useStyles()

    return (
        <Box component="div" className={classes.container}>
            <Slider {...settings} >
                <div className={classes.card}>
                    <Card className={classes.root}>
                    <CardHeader
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                    />
                    <CardMedia
                    className={classes.media}
                    image={Yellow}
                    title="Yellow"
                    />
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                    </CardContent>
                    
                    </Card>
                </div>

                <div className={classes.card}>
                    <Card className={classes.root}>
                    <CardHeader
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                    />
                    <CardMedia
                    className={classes.media}
                    image={Red}
                    title="Red"
                    />
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                    </CardContent>
                    
                    </Card>
                </div>

                <div className={classes.card}>
                    <Card className={classes.root}>
                    <CardHeader
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                    />
                    <CardMedia
                    className={classes.media}
                    image={Green}
                    title="Green"
                    />
                    <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                    </CardContent>
                    
                    </Card>
                </div>
                
            </Slider>
        </Box>
    )
};

export default Carousel;
