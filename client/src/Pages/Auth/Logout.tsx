import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

const Logout = (): JSX.Element => {
    if (
        localStorage.getItem("loggedIn") === "" ||
        localStorage.getItem("loggedIn") === null
    ) {
        return <Redirect to="/" />;
    }
    /**
     * Logout button handler.
     *
     * @param {React.MouseEvent} e The user clicking logout.
     */
    function handleLogout(e: React.MouseEvent) {
        e.preventDefault();
        localStorage.setItem("role", "");
        localStorage.setItem("loggedIn", "");
        localStorage.setItem("id", "");
        localStorage.setItem("token", "");
        window.location.href = "/";
    }

    return (
        <div>
            <h1> Are you sure you want to logout? </h1>
            <Button
                variant="success"
                size="lg"
                href="/"
                onClick={handleLogout}
                id="button"
            >
                {" "}
                Yes{" "}
            </Button>
            <Button variant="danger" size="lg" href="/" id="button">
                {" "}
                No{" "}
            </Button>
            {localStorage.getItem("loggedIn") === null ||
                (localStorage.getItem("loggedIn") === "" && (
                    <Redirect to="/" />
                ))}
        </div>
    );
};

export default Logout;
