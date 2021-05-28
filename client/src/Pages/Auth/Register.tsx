import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Button, Card, Badge } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

/**
 * Verifies if register.email is a valid email
 *
 * @param email - The email being checked.
 * @returns Whether or not the email is valid.
 */
function validateEmail(email: string): boolean {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && email.length > 6;
}

function getAge(DOB: Date): number {
    const today = new Date();
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 * Verifies if register.phone is a valid phone number
 *
 * @param phone - The phone number being checked. Must be 10 characters long, a number, and start with an 0.
 * @returns Whether or not the phone number is valid.
 */
function validatePhone(phone: string): boolean {
    const re = /^\d{10}$/;
    if (phone.match(re) && phone.charAt(0) === "0") {
        return true;
    } else {
        return false;
    }
}

function Register(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [dob, setDOB] = useState(new Date());
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState(0);

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
        if (
            !validateEmail(email) ||
            password.length < 8 ||
            firstName.length < 2 ||
            lastName.length < 2 ||
            getAge(dob) < 13 ||
            !validatePhone(phonenumber)
        ) {
            setError("One or more details did not fit. Please try again.");
            return;
        }
        const data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phone: phonenumber,
            dateofbirth: dob,
            address: address,
        };
        axios
            .post(`http://${url}:8080/auth/register`, data)
            .then((res) => {
                setStatus(200);
                setError("Successful register.");
               localStorage.setItem("token", res.data.token);
               localStorage.setItem("id", res.data.id);
               localStorage.setItem("role", res.data.role);
               localStorage.setItem("loggedIn", "true");
               window.location.href = "/";
            })
            .catch(function (error) {
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
                    <Badge>Register</Badge>
                </h3>
            </Card.Header>
            <Card.Body>
                <Form className="form" data-testid="register-form">
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="email"
                    >
                        <Form.Label>
                            <span>Email Address </span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            data-testid="email"
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
                            name="password"
                            data-testid="password"
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
                    <br></br>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="firstName"
                    >
                        <Form.Label>
                            <span>First Name</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="string"
                            name="firstname"
                            data-testid="firstname"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        {firstName.length < 2 && (
                            <Form.Text>
                                Please enter a first name greater than 2
                                characters
                            </Form.Text>
                        )}
                    </Form.Group>
                    <br></br>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="lastName"
                    >
                        <Form.Label>
                            <span>Last Name</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="string"
                            name="lastname"
                            data-testid="lastname"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                        {lastName.length < 2 && (
                            <Form.Text>
                                Please enter a last name greater than 2
                                characters
                            </Form.Text>
                        )}
                    </Form.Group>
                    <br></br>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="phone"
                    >
                        <Form.Label>
                            <span>Phone Number</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="string"
                            name="phonenumber"
                            data-testid="phonenumber"
                            placeholder="Enter phone number"
                            value={phonenumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                        {!validatePhone(phonenumber) && (
                            <Form.Text>
                                Please enter a valid Australian mobile phone
                                number
                            </Form.Text>
                        )}
                    </Form.Group>
                    <br></br>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="dateofbirth"
                    >
                        <Form.Label>
                            <span>Date of Birth </span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="date"
                            name="dateofbirth"
                            onChange={(e) => {
                                setDOB(new Date(e.target.value));
                            }}
                            placeholder="Date of Birth"
                        />
                        {getAge(dob) < 13 && (
                            <Form.Text>
                                You must be 13 years old or older to sign up.
                            </Form.Text>
                        )}
                    </Form.Group>
                    <br></br>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="address"
                    >
                        <Form.Label>
                            <span>Address</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="string"
                            data-testid="address"
                            name="address"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                        {address.length < 15 && (
                            <Form.Text>
                                Please enter an address greater than 15
                                characters.
                            </Form.Text>
                        )}
                    </Form.Group>
                    <br></br>
                    {error}
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
                        Already have an account? <a href="/login">Log in</a>.
                    </Form.Text>
                    <br></br>
                </div>
            </Card.Footer>
        </Card>
    );
}
export default Register;
