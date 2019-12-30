import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Dashboard from '../../components/dashboard/Dashboard';
import ProjectDetails from '../../components/projects/ProjectDetails';
import SignIn from '../../components/auth/SignIn';
import SignUp from '../../components/auth/SignUp';
import CreateProject from '../../components/projects/CreateProject';
import { Grid, withStyles } from '@material-ui/core';
import { navStyles } from '../../styles/styles';

const Home = ({ classes }) => {
	return (
		<BrowserRouter>
			<Grid container
				direction="column"
				justify="center"
				alignItems="center" >
				<Grid container item xs={12} className={classes.topNav}>
					<Navbar />
				</Grid>
				<Grid container item xs={12}>
					<Switch>
						<Route exact path='/' component={Dashboard} />
						<Route path='/project/:id' component={ProjectDetails} />
						<Route path='/signin' component={SignIn} />
						<Route path='/signup' component={SignUp} />
						<Route path='/create' component={CreateProject} />
					</Switch>
				</Grid>
			</Grid>
		</BrowserRouter>
	)
}

export default withStyles(navStyles)(Home)