import React, { useState, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/chat");
		} catch {
			setError("Failed to log in");
		}

		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h1 className="mb-4 text-center">Log In</h1>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} type="submit" className="w-100 mt-3">
							Log In
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 mt-2 text-center">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
};

export default Login;
