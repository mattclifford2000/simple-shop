import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const id: string | null = localStorage.getItem("id");

    useEffect(() => {
        async function setURL() {
            if (process.env.NODE_ENV === "development") {
                setUrl("localhost");
            } else if (process.env.NODE_ENV === "production") {
                setUrl("remote");
            }
        }
        async function setOrderList() {
            axios
                .get(`http://${url}:8080/user/orders/${id}`, {
                    params: {
                        id: id,
                    },
                })
                .then((res) => {
                    setOrders(res.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        setURL();
        setOrderList();
    }, [url, orders]);

    return (
        <div>
            <h5 color="black">Products</h5>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Order Date</th>
                        <th>Order Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.product}</td>

                            <td>{order.date.toString()}</td>
                            <td>${order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {error}
        </div>
    );
}

export default Orders;
