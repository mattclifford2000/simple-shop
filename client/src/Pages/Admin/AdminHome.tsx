import React, { useState, useEffect } from "react";
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import AddProduct from '../Admin/AddProduct';

const AdminHome = (): JSX.Element => {
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

    if (
        localStorage.getItem("loggedIn") !== "true" ||
        localStorage.getItem("role") !== "admin"
    ) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/adminhome">
                        <Card>
                            <Card.Header>
                                <h3 className="form">
                                    <Badge>Admin Home</Badge>
                                </h3>
                            </Card.Header>
                            <Card.Body>
                                <p>
                                    Welcome to the admin home. Please click a
                                    button to visit the task you would like to
                                    do.
                                </p>
                                <Button href="/adminhome/addproduct">
                                    Add Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Route>
                    <Route path="/adminhome/addproduct">
                        <AddProduct />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default AdminHome;
