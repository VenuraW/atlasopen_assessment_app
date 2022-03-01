import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Chat from "./Chat";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";

// import firebase from "com/app";

// import { useAuthState } from "react-firebase-hooks/auth";

//TODO: Add stats dashboard
function App() {
	const [user] = [0];
	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Router>
					<AuthProvider>
						<Switch>
							<Route path="/chat" component={Chat} />
							<Route path="/signup" component={Signup} />
							<Route path="/login" component={Login} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
