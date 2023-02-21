import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Box,
  CircularProgress,
  Link as LinkMui,
  Button,
  Snackbar,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareIcon from "@mui/icons-material/Share";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/IconButton";
import { ProductsStore } from "./ProductsContext";

const ViewProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();
  const context = useContext(ProductsStore);

  useEffect(() => {
    getProduct();
  }, [context.products]);

  const getProduct = async () => {
    setLoading(true);
    if (context.products.length > 0 && id) {
      let prod = context.products.filter((elem) => {
        return elem.id === +id;
      });
      setLoading(false);
      setProduct(...prod);
    } else {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://fakestoreapi.com/products/" + id
        );
        setLoading(false);
        setProduct({ ...response.data, cart: 1 });
      } catch (error) {
        // console.log(error);
        setLoading(false);
        setError(error);
      }
    }
  };
  const addToCart = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      {error ? (
        <h2>{error.message}. Please try again</h2>
      ) : (
        <>
          <LinkMui to="/products" component={Link}>
            <Button>Go back</Button>
          </LinkMui>
          {loading ? (
            <div className="spinner">
              <Box sx={{ justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <>
              <div style={{display:'flex', flexwrap:'wrap'}}>
                <Card
                  style={{
                    maxWidth: 800,
                    paddingTop: "3vh",
                   position:'static'
                  }}
                >
                  <CardHeader
                    title={product.title}
                    subheader={`Price:$ ${product.price}`}
                  ></CardHeader>
                  <div style={{ display: "flex", flexwrap: "wrap" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: "600" }}
                      height="auto"
                      image={product.image}
                    />
                  </div>
                </Card>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{}}>
                    <Typography
                      width="auto"
                      variant="body1"
                      color="text.secondary"
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                  <div style={{ textAlign:'center',}}>
                    <CardContent>
                      <Button
                        onClick={() => {
                          context.ProductUtils.updateCount(
                            "minus",
                            product,
                            context.products,
                            context.setProducts
                          );
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                      {product.cart}
                      <Button
                        onClick={() => {
                          context.ProductUtils.updateCount(
                            "add",
                            product,
                            context.products,
                            context.setProducts
                          );
                        }}
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        sx={{ margin: "4px" }}
                        aria-label="add to cart"
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "change",
                            product,
                            context.cart,
                            context.setCart
                          );
                        }}
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Add to cart
                      </Button>
                      <br />
                      {context.ProductUtils.productInCart(product, context.cart)?.length > 0 ? (
                        <Button
                          sx={{ margin: "2px" }}
                          color="error"
                          aria-label="Remove from cart"
                          onClick={() => {
                            context.ProductUtils.updateCart(
                              "remove",
                              product,
                              context.cart,
                              context.setCart
                            );
                          }}
                          variant="outlined"
                          startIcon={<RemoveShoppingCartIcon color="error" />}
                        >
                          Remove from cart
                        </Button>
                      ) : null}
                      <IconButton aria-label="share">
                        <Snackbar
                          open={open}
                          autoHideDuration={2000}
                          onClose={handleClose}
                          message="Product added to cart!"
                          action={action}
                        />
                      </IconButton>
                    </CardContent>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewProduct;
