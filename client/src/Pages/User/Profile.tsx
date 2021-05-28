import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Profile = (): JSX.Element => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState(new Date());
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState("");
    const id: string | null = localStorage.getItem("id");
    if (
        id === "" ||
        id === null
    ) {
        return <Redirect to="/" />;
    }

    useEffect(() => {
        async function setURL() {
            if (process.env.NODE_ENV === "development") {
                setUrl("localhost");
            } else if (process.env.NODE_ENV === "production") {
                setUrl("remote");
            }
        }
        async function getDetails() {
            axios
                .get(`http://${url}:8080/user/details/${id}`, {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    console.log("Success.");
                    setFname(res.data.fname);
                    setLname(res.data.lname);
                    setPhone(res.data.phone);
                    setAddress(res.data.address);
                    setEmail(res.data.email);
                    setDob(new Date(res.data.dob));
                    return;
                })
        }
        setURL();
        getDetails();
    }, [id, url]);

    if (
        localStorage.getItem("loggedIn") === "" ||
        localStorage.getItem("loggedIn") === null
    ) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>Profile Page: </h1>
            <p>
                Your name is {fname} {lname}.
            </p>
            <p>Your email is {email}.</p>
            <p>Your phone number is {phone}.</p>
            <p>Your date of birth is {dob.toString()}.</p>
            <p>Your address is {address}.</p>
            <br></br>
        </div>
    );
};

export default Profile;
