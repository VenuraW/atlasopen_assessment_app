import React from "react";
import { useRef } from "react";
import { db } from "../firebase";
import { Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import firebase from "firebase";

export default function SendMessage({ scroll }) {
	const messageRef = useRef();
	const { currentUser } = useAuth();

	async function sendMessage(e) {
		e.preventDefault();

		const { uid, photoURL, displayName } = currentUser;

		await db.collection("message").add({
			text: messageRef.current.value,
			uid,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			photoURL,
			displayName,
		});

		messageRef.current.value = "";
		scroll.current.scrollIntoView({ behaviour: "smooth" });
	}

	return (
		<Form onSubmit={sendMessage}>
			<div className="sendMessage">
				<Form.Control
					style={{
						width: "80%",
						fontSize: "15px",
						fontWeight: "550",
						marginLeft: "5px",
						marginBottom: "-3px",
					}}
					type="message"
					ref={messageRef}
					required
				/>
				<button
					style={{
						width: "20%",
						fontSize: "15px",
						fontWeight: "550",
						marginLeft: "1rem",
						maxWidth: "200px",
					}}
					type="submit"
					className="btn btn-success"
				>
					Send
				</button>
			</div>
		</Form>
	);
}
