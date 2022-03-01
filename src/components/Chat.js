import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import Logout from "./Logout";
import "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

//HINT
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useHistory,
} from "react-router-dom";

export default function Chat() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();

	function handleLogout() {}

	return (
		<>
			<Card>
				<Card.Body className="text-center">
					<h1>Chat Page</h1>
					{error && <Alert variant="danger">{error}</Alert>}
					<div className="d-flex flex-column text-center">
						<strong>{currentUser.displayName}</strong>
						<strong>{currentUser.email}</strong>
					</div>
					<Button variant="contained">Submit</Button>
				</Card.Body>
			</Card>
			<Button type="submit" onClick={handleLogout} className="w-100 mt-3">
				Log Out
			</Button>
		</>
	);
}
