import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Pagination from "../UI/Pagination";
import { useParams } from "react-router-dom";
import SortingProducts from "../UI/SortingProducts";

const Products = () => {
  const [loader, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState();

  useEffect(() => {
    getProductByCatagories();
  }, [id]);
  const getData = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      let array = response.data.map((elem) => {
        return { ...elem, cart: 1, images: [elem.image] };
      });
      setLoading(false);
      setItems(array);
    } catch (error) {
      setLoading(false);
          setError(error);
    }
  };
  const getProductByCatagories = async () => {
    if (id) {
      const url =
        "https://us-central1-ecommerce-database-jawa.cloudfunctions.net/app/";
      if (id == 5) {
        getData(url);
      } else {
        try {
          setLoading(true);
          if (id && id != 5) {
            const response = await axios.get(
              "https://api.escuelajs.co/api/v1/products/?categoryId=" + id
            );
            let array = response.data.map((elem) => {
              return { ...elem, cart: 1 };
            });
            setLoading(false);
            setItems(array);
          }
        } catch (error) {
          setLoading(false);
          setError(error);
        }
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <SortingProducts products={items} setProducts={setItems} />
        <Pagination items={items} setPageItems={setPageItems} />
      </div>

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
                        <ProductCard key={index} prod={prod} />
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

export default React.memo(Products);
