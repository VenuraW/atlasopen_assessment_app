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

// import firebase from "com/app";

// import { useAuthState } from "react-firebase-hooks/auth";

//TODO: Add stats dashboard
function App() {
	const [user] = [0];
	return (
		<div className="App">
			{user && (
				<>
					<Router>
						<Chat />
					</Router>
				</>
			)}
			{!user && (
				<Container
					className="d-flex align-items-center justify-content-center"
					style={{ minHeight: "100vh" }}
				>
					<div className="w-100" style={{ maxWidth: "400px" }}>
						<Signup />
						<Login />
					</div>
				</Container>
			)}
		</div>
	);
}

export default App;
