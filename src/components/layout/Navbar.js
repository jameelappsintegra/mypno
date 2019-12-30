import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

const Navbar = (props) => {
	const { auth, profile } = props
	return (
		<Grid container>
			<Grid item xs={6} md={6} sm={6}>
				<Link to="/" className="brand-logo">MYpno</Link>
			</Grid>
			<Grid item xs={6} md={6} sm={6}>
				{auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />}
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