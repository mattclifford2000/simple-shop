import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Table } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

function ProductList(): JSX.Element {
    const [products, setProducts] = useState<any[]>([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();

    useEffect(() => {
        async function setURL() {
            if (process.env.NODE_ENV === "development") {
                setUrl("localhost");
            } else if (process.env.NODE_ENV === "production") {
                setUrl("remote");
            }
        }
        async function setProductList() {
            axios
                .get(`http://${url}:8080/shop/productlist`)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        setURL();
        setProductList();
    }, [url, products]);

    function handleProductClick(id: any) {
        console.log(id);
        history.push({
            pathname: `/product/${id}`,
            state: {
                // location state
                id: id,
            },
        });
    }

    return (
        <div>
            <h5 color="black">Products</h5>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product._id}
                            data-href={`/product/:${product._id}`}
                            onClick={() => handleProductClick(product._id)}
                        >
                            <td>{product.name}</td>

                            <td>{product.category}</td>
                            <td>${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {error}
        </div>
    );
}

export default ProductList;
