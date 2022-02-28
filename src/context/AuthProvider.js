import React, { useContext, useEffect } from "react";
import { auth } from "../firebase";

const AutoContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	auth.onAuthStateChanged((user) => {
		setCurrentUser(user);
	});

	const value = {
		currentUser,
		signup,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
