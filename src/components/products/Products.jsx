import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Products.css";
import { Box, CircularProgress } from "@mui/material";
import { ProductsStore } from "./ProductsContext";

const Products = () => {
  useEffect(() => {
    getProducts();
    console.log(ProductsStore)
  }, [ProductsStore]);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setLoading(false);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
    <ProductsStore.Provider value={{product}}>
      <div className="product-container">
        {loading ? (
          <div  className="spinner">
          <Box sx={{ justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box></div>
        ) : (
          product.map((prod, index) => {
            return <ProductCard key={index} prod={prod} />;
          })
        )}
      </div>
      </ProductsStore.Provider>
    </>
  );
};

export default Products;
