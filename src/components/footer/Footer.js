import React from 'react';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { FooterStyles } from '../styles.js';


const Footer = ({ classes }) => {
    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.footerMain}>
            <Grid item xs={12}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h6' className={classes.footerText}>2020&copy; MYPNO</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant='h6' className={classes.footerText}>Footer link</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(FooterStyles)(Footer);