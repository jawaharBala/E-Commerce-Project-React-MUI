import React from "react";
import { useContext } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import { Box, CircularProgress } from "@mui/material";
import { ProductsStore } from "./ProductsContext";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const { products, loading, error,setProducts,ProductUtils,cart,setCart} =
    useContext(ProductsStore);


  return (
    <>
      <div className="product-container">
        {error ? (
          <h2>{error.message}. Please try again.</h2>
        ) : (
          <>
            {loading ? (
              <div className="spinner">
                <Box sx={{ justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              products.length > 0 &&
              products.map((prod, index) => {
                return (
                  <ProductCard
                    key={index}
                    prod={prod}
                    updateCount={ProductUtils.updateCount}
                    products={products}
                    updateCart={ProductUtils.updateCart}
                    setProducts={setProducts}
                    productInCart={ProductUtils.productInCart}
                    cart={cart}
                    setCart={setCart}
                  />
                );
              })
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
