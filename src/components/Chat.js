import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import DateObject from "react-date-object";

import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import SendMessage from "./SendMessage";

export default function Chat() {
	const scroll = useRef();
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const [messages, setMessages] = useState([]);

	function getFormatTime(seconds) {
		return new DateObject(seconds * 1000).format("ddd hh:mm a");
	}

	useEffect(() => {
		db.collection("message")
			.orderBy("createdAt", "asc")
			.limit(50)
			.onSnapshot((snapshot) => {
				var messagesObjects = snapshot.docs.map((doc) => doc.data());
				setMessages(
					messagesObjects.map((m) => {
						m.formatTime = getFormatTime(m.createdAt.seconds);
						return m;
					})
				);
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
					<div className="account">
						<p style={{ marginRight: "1rem" }} className="username">
							{auth.currentUser.displayName}
						</p>
						<img className="profile" src={auth.currentUser.photoURL} alt="" />
					</div>
					<Card style={{ height: "50vh" }}>
						<Card.Body
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								overflow: "scroll",
							}}
						>
							{messages.map(
								({ id, formatTime, displayName, uid, photoURL, text }) => (
									<div
										className={uid === currentUser.uid ? "sent" : "received"}
										key={id}
									>
										<p style={{ marginBottom: "0rem" }}>{formatTime}</p>
										<div
											key={uid}
											className={`message ${
												uid === currentUser.uid ? "sent-text" : "received-text"
											}`}
										>
											<img className="profile" src={photoURL} alt="" />
											<div className="message-content">
												<p className="username">{displayName}</p>
												<p className="message-text">{text}</p>
											</div>
										</div>
									</div>
								)
							)}
							<div ref={scroll}></div>
						</Card.Body>
					</Card>
				</Card.Body>
				<SendMessage scroll={scroll} />
			</Card>
			<Button type="submit" onClick={handleLogout} className="w-100 mt-3">
				Log Out
			</Button>
		</>
	);
}
