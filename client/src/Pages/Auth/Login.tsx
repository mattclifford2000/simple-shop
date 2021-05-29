import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Badge } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

/**
 * Verifies if login.email is a valid email
 *
 * @param email - The email being checked.
 * @returns Whether or not the email is valid.
 */
function validateEmail(email: string): boolean {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && email.length > 6;
}

/**
 * Displays the login form
 *
 *
 * @returns The login form of the application.
 */
const Login = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(0);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        async function setURL() {
            if (process.env.NODE_ENV === "development") {
                setUrl("localhost");
            } else if (process.env.NODE_ENV === "production") {
                setUrl("remote");
            }
        }
        setURL();
    }, [url]);

    if (localStorage.getItem("loggedIn") === "true") {
        return <Redirect to="/" />;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Run this before client validation.
        if (!validateEmail(email) || password.length < 8) {
            setError("The details you entered are invalid. Please try again.");
            return;
        }
        //Submit Email and Password entered by the user to backend
        const user = {
            email: email,
            password: password,
        };

        axios
            .post(`http://${url}:8080/auth/login`, user)
            .then((res) => {
                setStatus(200);
                setError("Successful login.");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("loggedIn", "true");
                window.location.href = "/";
            })
            .catch(function (error) {
                console.error(error);
                setStatus(error.response.status);
                if (status !== 200) {
                    setError(error.response.data);
                    return;
                }
            });
    }

    return (
        <Card>
            <Card.Header>
                <h3 className="form">
                    <Badge>Login</Badge>
                </h3>
            </Card.Header>
            <Card.Body>
                <Form className="form" data-testid="login-form">
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="email"
                    >
                        <Form.Label>
                            <span>Email Address </span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            data-testid="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {!validateEmail(email) && (
                            <Form.Text>Please enter a valid email</Form.Text>
                        )}
                    </Form.Group>
                    <br></br>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="password"
                    >
                        <Form.Label>
                            <span>Password </span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="password"
                            data-testid="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {password.length < 8 && (
                            <Form.Text>
                                Please enter a password greater than 8
                                characters.
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Text>{error}</Form.Text>
                </Form>
            </Card.Body>
            <Card.Footer>
                <div className="form">
                    <Button
                        variant="primary"
                        data-testid="submit"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        Submit
                    </Button>
                    <Form.Text>
                        New to the simple shop?{" "}
                        <a href="/register">Register Here</a>.
                    </Form.Text>
                    <br></br>
                </div>
            </Card.Footer>
        </Card>
    );
};
export default Login;
