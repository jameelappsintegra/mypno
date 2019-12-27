import firebaseConfig from '../configs/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({
	timestampsInSnapshots: true
});

const storage = firebase.storage();

export { storage, firebase as default }