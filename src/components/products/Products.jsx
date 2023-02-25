import React from "react";
import { useContext } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import { Box, CircularProgress, Chip, CssBaseline } from "@mui/material";
import { ProductsStore } from "./ProductsContext";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const {
    products,
    loading,
    error,
    updateProducts,
    ProductUtils,
    cart,
    updateCartItems,
  } = useContext(ProductsStore);
  const { user } = useAuth();

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
              <>
                {/* {!user ? (
                  <>
                    <Chip
                      sx={{ marginLeft: "25%", marginBottom:'2vh' }}
                      color="primary"
                      label={"Login to add products to cart"}
                    ></Chip>
                    <br />
                  </>
                ) : null} */}
                {products.length > 0 &&
                  products.map((prod, index) => {
                    return (
                      <>
                        <CssBaseline />
                        <ProductCard
                          key={index}
                          prod={prod}
                          updateCount={ProductUtils.updateCount}
                          products={products}
                          updateCart={ProductUtils.updateCart}
                          updateProducts={updateProducts}
                          productInCart={ProductUtils.productInCart}
                          cart={cart}
                          updateCartItems={updateCartItems}
                        />
                      </>
                    );
                  })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
