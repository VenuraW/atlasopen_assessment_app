import React from "react";
import { useRef } from "react";
import { db, auth } from "../firebase";
import { Card, Form, Button } from "react-bootstrap";
import firebase from "firebase";

export default function SendMessage() {
	// const [message, setMessage] = useState("");
	const messageRef = useRef();

	async function sendMessage(e) {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;

		await db.collection("message").add({
			text: messageRef.current.value,
			uid,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			photoURL,
		});

		messageRef.current.value = "";
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
						margin: "4px 5% -13px 5%",
						maxWidth: "200px",
					}}
					type="submit"
					class="btn btn-success"
				>
					Send
				</button>
			</div>
		</Form>
	);
}
