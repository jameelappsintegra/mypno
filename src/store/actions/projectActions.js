export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore, }) => {
		const firestore = getFirestore()
		const profile = getState().firebase.auth;
		console.log('displayname', profile);

		const displayName = profile.displayName === null ? profile.email : profile.displayName.slice(' ');

		firestore.collection('projects').add({
			...project,
			authorFirstName: displayName[0],
			authorLastName: displayName[displayName.length - 1],
			authorId: profile.uid,
			createdAt: new Date(),
		}).then(() => {
			dispatch({ type: 'CREATE_PROJECT', project });
		}).catch((err) => {
			dispatch({ type: 'CREATE_PROJECT_ERROR', err });
		});

	}
}