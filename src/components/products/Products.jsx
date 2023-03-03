import React, { useEffect } from "react";
import { useContext } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import {
  Box,
  CircularProgress,
  Chip,
  CssBaseline,
  TablePagination,
} from "@mui/material";
import { ProductsStore } from "./ProductsContext";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Pagination from "../UI/Pagination";

const Products = () => {
  const { ProductUtils, cart, updateCartItems } = useContext(ProductsStore);
  const [loader, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();
  const [error, setError] = useState();

  useEffect(() => {
    getProductByCatagories();
  }, [id]);

  const getProductByCatagories = async () => {
    try {
      setLoading(true);
      if (id) {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products/?categoryId=" + id
        );
        let array = response.data.map((elem) => {
          return { ...elem, cart: 1 };
        });
        setLoading(false);
        setItems(array);
      } else {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products/"
        );
        let array = response.data.map((elem) => {
          return { ...elem, cart: 1 };
        });
        setLoading(false);
        setItems(array);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };



  return (
    <>
     <Pagination items={items} setPageItems={setPageItems}/>

      <div className="product-container">
        {error ? (
          <h2>{error.message}. Please try again.</h2>
        ) : (
          <>
            {loader ? (
              <div>
                <Box sx={{ margin: "auto", textAlign: "center" }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              <>
     
                {pageItems.length > 0 &&
                  pageItems?.map((prod, index) => {
                    return (
                      <>
                        <CssBaseline />
                        <ProductCard
                          key={index}
                          prod={prod}
                          updateCart={ProductUtils.updateCart}
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
