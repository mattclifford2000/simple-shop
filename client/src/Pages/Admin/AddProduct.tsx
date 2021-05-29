import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Button, Card, Badge } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

const AddProduct = (): JSX.Element => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
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

   if (
       localStorage.getItem("loggedIn") !== "true" ||
       localStorage.getItem("role") !== "admin"
   ) {
       return <Redirect to="/" />;
   }

    function handleSubmit(e: React.FormEvent) {
        return 0;
    }

    return (
        <Card>
            <Card.Header>
                <h3 className="form">
                    <Badge>Add Product</Badge>
                </h3>
            </Card.Header>
            <Card.Body>
                <Form className="form">
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="name"
                    >
                        <Form.Label>
                            <span>Product Name </span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="string"
                            name="name"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        {name.length < 6 && (
                            <Form.Text>Please enter a valid name</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="category"
                    >
                        <Form.Label>
                            <span>Product Category</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="string"
                            name="category"
                            placeholder="Enter product category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        />
                        {category.length < 6 && (
                            <Form.Text>Please enter a valid name</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="description"
                    >
                        <Form.Label>
                            <span>Product Description</span>{" "}
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Enter product description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        {description.length < 10 && (
                            <Form.Text>Please enter a valid name</Form.Text>
                        )}
                    </Form.Group>
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
                        Add
                    </Button>
                    <br></br>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default AddProduct;
