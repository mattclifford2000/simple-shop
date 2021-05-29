import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

function Product(props: any): JSX.Element { 
    const location = useLocation();
    const params = location.state as any;
    const id = params.id;
    return (<div>Product {id}</div>);
}

export default Product;