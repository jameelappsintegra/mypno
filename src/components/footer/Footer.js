import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { FooterStyles } from '../styles.js';


const Footer = ({ classes }) => {
    return (
        <Grid container item xs={12} direction="row"
            justify="center"
            alignItems="center" className={classes.footerMain}>
            <Grid item xs={12}>
                <Typography variant='h5'>Footer</Typography>
            </Grid>
        </Grid>
    )
}

export default withStyles(FooterStyles)(Footer);