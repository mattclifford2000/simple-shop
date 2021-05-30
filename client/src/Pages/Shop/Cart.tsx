import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Button } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

function Cart(): JSX.Element {
    const [url, setUrl] = useState("");
    let cart = localStorage.getItem("cart");
    const history = useHistory();

    useEffect(() => {
        async function setURL() {
            if (process.env.NODE_ENV === "development") {
                setUrl("localhost");
            } else if (process.env.NODE_ENV === "production") {
                setUrl("remote");
            }
        }
        async function emptyCart() {
            if (cart === "" || cart === null || cart === undefined) {
                cart = "The cart is empty.";
            }
        }
        setURL();
        emptyCart();
    }, [url]);

    function emptyCart(e: React.FormEvent) {
        e.preventDefault();
        localStorage.setItem("cart", "");
        history.push({
            pathname: `/`,
        });
    }

    return (
        <div>
            <p>{cart}</p>
            <Button
                variant="primary"
                data-testid="submit"
                onClick={(e) => {
                    emptyCart(e);
                }}
            >
                Empty Cart
            </Button>
        </div>
    );
}

export default Cart;
