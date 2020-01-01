import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { Typography, Select, MenuItem } from '@material-ui/core';

class CreateProject extends Component {

	state = {
		title: '',
		content: '',
		filenames: [],
		downloadURLs: [],
		isUploading: false,
		uploadProgress: 0,
		youtubeLink: ''
	}
	handleChange = (e) => {
		const { target } = e;
		this.setState({
			[target.id]: target.value
		});
	}
	handleUploadStart = () => {
		this.setState({
			isUploading: true,
			uploadProgress: 0
		});
	};
	handleProgress = progress => {
		this.setState({
			uploadProgress: progress
		});
	};
	handleUploadError = error => {
		this.setState({
			isUploading: false
			// Todo: handle error
		});
		console.error(error);
	};
	handleYoutubeLink = (e) => {
		const { target } = e;
		this.setState({
			[target.id]: target.value
		})
		console.log(target.id)
	};
	handleUploadSuccess = async filename => {
		const downloadURL = await firebase
			.storage()
			.ref("images")
			.child(filename)
			.getDownloadURL();

		this.setState(oldState => ({
			filenames: [...oldState.filenames, filename],
			downloadURLs: [...oldState.downloadURLs, downloadURL],
			uploadProgress: 100,
			isUploading: false
		}));
	};
	handleSubmit = (e) => {
		e.preventDefault();
		if ((!this.state.title) || (!this.state.content)) {
			alert('empty value cannot be posted');
			return;
		}
		this.props.createProject(this.state)
		this.props.history.push('/')
	}

	render() {
		const { auth } = this.props
		if (!auth.uid) return <Redirect to='/signin' />
		return (
			<div className="container">
				<form className="white" onSubmit={this.handleSubmit}>
					<Typography variant='h5'>Create Article</Typography>

					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="content">Content</label>
						<textarea className="materialize-textarea" id="content" onChange={this.handleChange}></textarea>
					</div>
					<div className="input-field">
						<label htmlFor="youtube">Youtube link</label>
						<input type="text" id="youtube" onChange={this.handleYoutubeLink} />
					</div>
					<label>Category</label>
					<div className="input-field">
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</div>
					<div className="input-field">
						<FileUploader
							accept="image/*"
							name="image-uploader-multiple"
							randomizeFilename
							storageRef={firebase.storage().ref("images")}
							onUploadStart={this.handleUploadStart}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
							multiple
						/>
						<p>Progress: {this.state.uploadProgress}</p>
						<p>Filenames: {this.state.filenames.join(", ")}</p>
						<div>
							{this.state.downloadURLs.map((downloadURL, i) => {
								return <img key={i} src={downloadURL} alt={downloadURL} width='200' height='150' />;
							})}
						</div>

					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">
							Create
					</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return { createProject: project => dispatch(createProject(project)) }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProject);