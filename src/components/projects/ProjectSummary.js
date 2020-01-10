import React from 'react';
import moment from 'moment';
import 'moment/locale/en-ie';
import { withStyles } from '@material-ui/core';
import { ProjectSummaryStyles } from '../styles.js';
import PlaceholderImage from '../../../src/images/default_placeholder.jpg';

const ProjectSummary = ({ project, classes }) => {
	return (
		<React.Fragment>
			<div className="row card z-depth-0 project-summary">
				<div className="card-image col m6">
					{
						project.downloadURLs && project.downloadURLs.slice(0, 1).map((image, i) => {
							return (
								<img key={i} src={!image ? PlaceholderImage : image} alt={!image ? 'paceholder' : project.filename} />
							)
						})
					}
					{/* {console.log('getTimezoneOffset', project.createdAt.toDate())} */}
				</div>
				<div className="card-content grey-text text-darken-3 col m6">
					<span className="card-title ">{project.title}</span>
					<span className={classes.tag}>{project.category}</span>
					<p>Posted by {project.authorFirstName}</p>
					<p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
				</div>
			</div>
		</React.Fragment>
	)
}

export default withStyles(ProjectSummaryStyles)(ProjectSummary);