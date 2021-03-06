import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useLocation, Redirect } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

function Product(): JSX.Element {
    const location = useLocation();
    const params = location.state as any;
    const id: string = params.id;
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState("out of stock.");
    const [updateStock, setUpdateStock] = useState(0);
    const [error, setError] = useState("");
    const history = useHistory();

    if (id === "" || id === null || id === undefined) {
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
                .get(`http://${url}:8080/shop/product/${id}`, {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    console.log("Success.");
                    setName(res.data.name);
                    setCategory(res.data.category);
                    setDescription(res.data.description);
                    setPrice(res.data.price);
                    if (res.data.quantity > 0) {
                        setStock("in stock.");
                    }
                    return;
                });
        }
        setURL();
        getDetails();
    }, [id, url]);

    function handleUpdateStock(e: React.FormEvent) {
        e.preventDefault();
        if (
            !Number.isInteger(updateStock) ||
            updateStock < 1 ||
            updateStock > 999
        ) {
            setError("Invalid amount of stock to add.");
            return;
        }
        const data = {
            stock: updateStock,
            product: id
        };
        axios
            .post(`http://${url}:8080/admin/addstock`, data)
            .then((res) => {
                setError("Stock update successful.");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function handleDeleteProduct(e: React.FormEvent) {
        e.preventDefault();
        const data = {
            product: id,
        };
        axios
            .post(`http://${url}:8080/admin/deleteproduct`, data)
            .then((res) => {
                history.push({
                    pathname: `/`,
                });
            })
            .catch(function (error) {
                console.error(error);
            });
        return 0;
    }

    function handleBuy(e: React.FormEvent) {
        e.preventDefault();
        if (
            localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined ||
            localStorage.getItem("id") === ""
        ) {
            setError("Only a logged in user can buy something.");
            return;
        }
        if (price < 1) {
            setError("Out of stock.");
            return;
        }
        const data = {
            productID: id,
            userID: localStorage.getItem("id"),
            price: price,
        };
        axios
            .post(`http://${url}:8080/shop/buy`, data)
            .then((res) => {
                setError("Purchase success");
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <div>
            <h1>Product</h1>
            <p>Name: {name}</p>
            <p>Category: {category}</p>
            <p>Description: {description}</p>
            <p>Price: ${price}</p>
            <p>This product is {stock}</p>
            <Button
                variant="primary"
                data-testid="submit"
                onClick={(e) => {
                    handleBuy(e);
                }}
            >
                Buy
            </Button>
            <br></br>
            <br></br>
            <br></br>
            {localStorage.getItem("role") === "admin" && (
                <div>
                    <Form>
                        <Form.Group
                            style={{ width: "15rem", margin: "auto" }}
                            controlId="stock"
                        >
                            <Form.Label>
                                <span>Add Stock</span>{" "}
                            </Form.Label>
                            <Form.Control
                                type="string"
                                name="addstock"
                                placeholder="Enter stock to add"
                                value={updateStock}
                                onChange={(e) => {
                                    setUpdateStock(Number(e.target.value));
                                }}
                            />
                        </Form.Group>
                        <br></br>
                        <Button
                            onClick={(e) => {
                                handleUpdateStock(e);
                            }}
                        >
                            Add
                        </Button>
                    </Form>
                    <br></br>
                    <Form.Label>
                        <span>Delete Product</span>{" "}
                    </Form.Label>
                    <br></br>
                    <Button
                        onClick={(e) => {
                            handleDeleteProduct(e);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )}
            {error}
        </div>
    );
}

export default Product;
