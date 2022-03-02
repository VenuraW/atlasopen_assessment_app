import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(photoURL, nickname, email, password) {
		return auth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				result.user.updateProfile({
					displayName: nickname,
					photoURL: photoURL,
				});
			});
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	// Set the current user anytime a user is created with an email and password once
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setLoading(false);
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []); // Unsubscribe from onAuthStateChanged listener only once when we unmount the component

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
