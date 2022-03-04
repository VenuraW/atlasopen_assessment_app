import React, { useState, useRef, useEffect } from "react";
import "./Signup.css";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
	const nicknameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [photoURL, setPhotoURL] = useState("");

	useEffect(() => {
		axios.get("http://random.dog/woof.json").then((res) => {
			setPhotoURL(res.data.url);
		});
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(
				photoURL,
				nicknameRef.current.value,
				emailRef.current.value,
				passwordRef.current.value
			);
			history.push("/chat");
		} catch {
			setError("Failed to create an account");
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
					<h1 className="mb-4 text-center">Sign up</h1>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="nickname">
							<Form.Label>Nickname</Form.Label>
							<Form.Control type="nickname" ref={nicknameRef} required />
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<Button disabled={loading} type="submit" className="w-100 mt-3">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			{user.error && <h4>{user.error}</h4>}
			<div className="w-100 mt-2 text-center">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</>
	);
};

export default Signup;
