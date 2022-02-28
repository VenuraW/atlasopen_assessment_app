import { initializeApp } from "firebase/app";

import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp({
	apiKey: firebaseConfig.apiKey,
	authDomain: firebaseConfig.authDomain,
	projectId: firebaseConfig.projectId,
	storageBucket: firebaseConfig.storageBucket,
	messagingSenderId: firebaseConfig.messagingSenderId,
	appId: firebaseConfig.appId,
});

export const auth = app.auth();
export default app;
