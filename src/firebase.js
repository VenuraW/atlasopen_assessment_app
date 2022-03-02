import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

const app = firebase.initializeApp({
	apiKey: firebaseConfig.apiKey,
	authDomain: firebaseConfig.authDomain,
	projectId: firebaseConfig.projectId,
	storageBucket: firebaseConfig.storageBucket,
	messagingSenderId: firebaseConfig.messagingSenderId,
	appId: firebaseConfig.appId,
});

export const auth = firebase.auth();
export const db = app.firestore();
export default app;
