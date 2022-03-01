import React, { useState, useRef } from "react";
import { useFirebaseApp } from "reactfire";
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

	// User State
	const [user, setUser] = useState({
		nickname: "",
		email: "",
		password: "",
		error: "",
	});

	// onChange function
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
			error: "",
		});
	};

	// Import firebase
	const firebase = 1;

	// Submit function (Create account)
	const handlesSubmit = async (e) => {
		e.preventDefault();
		// Sign up code here.
		await firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((result) => {
				// Update the nickname
				result.user.updateProfile({
					displayName: user.nickname,
				});

				const myURL = { url: "http://localhost:3000/" };

				// Send Email Verification and redirect to my website.
				result.user
					.sendEmailVerification(myURL)
					.then(() => {
						setUser({
							...user,
							verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
						});
					})
					.catch((error) => {
						setUser({
							...user,
							error: error.message,
						});
					});

				// Sign Out the user.
				firebase.auth().signOut();
			})
			.catch((error) => {
				// Update the error
				setUser({
					...user,
					error: error.message,
				});
			});
	};

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
			{user.error && <h4>{user.error}</h4>}
			<div className="w-100 mt-2 text-center">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	);
};

export default Login;
