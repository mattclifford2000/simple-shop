import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    const [error, setError] = useState("");

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

    function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        const append = `${id} `;
        localStorage.setItem("cart", localStorage.getItem("cart") + append);
        setError("Product added.");
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
                    handleAdd(e);
                }}
            >
                Add to Cart
            </Button>
            {error}
        </div>
    );
}

export default Product;
