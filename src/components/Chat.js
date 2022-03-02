import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import ChatBox from "./SendMessage";
import SendMessage from "./SendMessage";

export default function Chat() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		db.collection("message")
			.orderBy("createdAt", "asc")
			.limit(50)
			.onSnapshot((snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});
	}, []);

	async function handleLogout() {
		setError("");

		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Failed to logout");
		}
	}

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
					<Card>
						<Card.Body>
							{messages.map(({ uid, photoURL, text }) => (
								<div>
									<div
										key={uid}
										className={`message ${
											uid == auth.currentUser ? "send" : "received"
										}`}
									>
										<img className="profile" src={photoURL} alt="" />
										<p className="message-text">{text}</p>
									</div>
								</div>
							))}
							<SendMessage />
						</Card.Body>
					</Card>
				</Card.Body>
			</Card>
			<Button type="submit" onClick={handleLogout} className="w-100 mt-3">
				Log Out
			</Button>
		</>
	);
}
