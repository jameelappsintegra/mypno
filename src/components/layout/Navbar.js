import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
// import SignedInLinks from './SignedInLinks';
// import SignedOutLinks from './SignedOutLinks';
import Humburger from './Humburger';

const Navbar = (props) => {
	// const { auth, profile } = props
	return (
		<Grid container
			direction="row"
			justify="space-between"
			alignItems="center">
			<Grid item xs={4} md={4} sm={4}>
				<Link to="/" className="brand-logo">Mypno</Link>
			</Grid>
			<Grid item xs={8} md={8} sm={8}>
				{/* {auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />} */}
				<Humburger />
			</Grid>
		</Grid>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(Navbar)