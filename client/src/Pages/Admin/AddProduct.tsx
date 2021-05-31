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
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
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
        e.preventDefault();
        if (
            name.length < 6 ||
            category.length < 6 ||
            description.length < 10 ||
            quantity < 1 ||
            quantity > 999 ||
            !Number.isInteger(quantity) ||
            price < 0.05 ||
            price > 9999.99
        ) {
            setError("One or more details did not fit. Please try again.");
            return;
        }
        const data = {
            name: name,
            category: category,
            description: description,
            quantity: quantity,
            price: price,
        };
        axios
            .post(`http://${url}:8080/admin/addproduct`, data)
            .then((res) => {
                setStatus(200);
                setError("Successful add product.");
                window.location.href = "/adminhome";
            })
            .catch(function (error) {
                setStatus(error.response.status);
                if (status !== 200) {
                    setError(error.response.data);
                    return;
                }
            });
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
                            <Form.Text>
                                Please enter a valid description
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="quantity"
                    >
                        <Form.Label>
                            <span>Product Quantity</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            placeholder="Enter product quantity"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(Number(e.target.value));
                            }}
                        />
                        {quantity < 1 ||
                            quantity > 999 ||
                            (!Number.isInteger(quantity) && (
                                <Form.Text>
                                    Please enter a valid quantity
                                </Form.Text>
                            ))}
                    </Form.Group>
                    <Form.Group
                        style={{ width: "15rem", margin: "auto" }}
                        controlId="price"
                    >
                        <Form.Label>
                            <span>Product Price</span>{" "}
                        </Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => {
                                setPrice(Number(e.target.value));
                            }}
                        />
                        {price < 0.05 ||
                            (price > 9999.99 && (
                                <Form.Text>
                                    Please enter a valid price
                                </Form.Text>
                            ))}
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
                        Add
                    </Button>
                    <br></br>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default AddProduct;
