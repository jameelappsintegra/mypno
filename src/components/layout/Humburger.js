import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Drawer, List, ListItem, Divider } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Humburger = (props) => {
    const { newsCategory, auth } = props;
    console.log('props', props.newsCategory);
    console.log('newscat', newsCategory)

    //--------------
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const SignedOutList = () => {
        return (
            <React.Fragment>
                {/* <NavLink to="/signin">Login</NavLink> */}
                <ListItem onClick={props.signOut} href="/signin">
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Login'} />
                </ListItem>
            </React.Fragment>
        )
    };
    const SignedInList = () => {
        return (
            <React.Fragment>
                <ListItem href="/create">
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary={'Create Post'} />
                </ListItem>
                <ListItem to='/'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    {/* <ListItemText primary={props.profile.initials} /> */}
                    <ListItemText primary={'Log out'} />
                </ListItem>
            </React.Fragment>
        )
    };
    const sideList = side => (
        <Grid
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {
                    auth.uid ?
                        <SignedInList />
                        :
                        <SignedOutList />
                }
            </List>
        </Grid>
    );

    //----------------
    return (
        <Grid container
            direction="row"
            justify="flex-end"
            alignItems="center">
            <Button onClick={toggleDrawer('right', true)}>
                <MenuIcon fontSize="large" />
            </Button>
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </Grid>

    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        newsCategory: state.firestore.ordered.newsCategory,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "newsCategory" }
    ])
)(Humburger);