import React from "react";
import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/General/Home";
import Profile from "./Pages/User/Profile";
import Product from "./Pages/Shop/Product";
import InvalidPage from "./Pages/General/InvalidPage";
import AdminHome from "./Pages/Admin/AdminHome";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Returns the root of the application
 *
 * @remarks
 * This is the entry point of the project.
 *
 * @returns The App that acts as the project entry point
 */
function App(): JSX.Element {
    return (
        <Router data-testid="router">
            <div className="App">
                <Navbar bg="dark" variant="dark" className="nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {localStorage.getItem("loggedIn") !== "true" && (
                            <Nav.Link href="/register">Register</Nav.Link>
                        )}
                        {localStorage.getItem("loggedIn") !== "true" && (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                        {localStorage.getItem("loggedIn") === "true" && (
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        )}
                        {localStorage.getItem("role") === "admin" && (
                            <Nav.Link href="/adminhome">
                                Administration
                            </Nav.Link>
                        )}
                        {localStorage.getItem("loggedIn") === "true" && (
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/adminhome">
                        <AdminHome />
                    </Route>
                    <Route path="/product/:id">
                        <Product />
                    </Route>
                    <Route path="*">
                        <InvalidPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
