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
  Chip,
  useMediaQuery,
  Alert
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
import { useAuth } from "../contexts/AuthContext";

const ViewProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();
  const context = useContext(ProductsStore);
  const isMobile = useMediaQuery("(max-width:600px)");
  const {user} = useAuth();
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
              <Card
                sx={{
                  width: isMobile ? ('40vh') : ('100vh'),
                  paddingTop: "3vh",
                  position: "static",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <CardHeader
                  title={product.title}
                  subheader={
                    <Chip
                      sx={{ backgroundColor: "yellow", fontSize: 20 }}
                      label={`$ ${product.price}`}
                    />
                  }
                  sx={{ fontSize: 35, padding: "3px" }}
                ></CardHeader>
                <CardMedia
                  component="img"
                  sx={{ width: "25vh", height: "auto" }}
                  image={product.image}
                />

                {/* <div style={{ display: "flex" }}> */}
                <CardContent sx={{}}>
                  <Typography variant="body1" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <div style={{ textAlign: "center" }}>
                  <CardContent>
                    <Button
                      onClick={() => {
                        context.ProductUtils.updateCount(
                          "minus",
                          product,
                          context.products,
                          context.updateProducts
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
                          context.updateProducts
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
                          context.updateCartItems,
                          user?.uid
                        );
                      }}
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      disabled={!user}
                    >
                      Add to cart
                    </Button>
                    <br />
                    {!user ? (<Alert severity="info">{"Login to add products to cart"}</Alert>): null}
                    {context.ProductUtils.productInCart(product, context.cart)
                      ?.length > 0 ? (
                      <Button
                        sx={{ margin: "2px" }}
                        color="error"
                        aria-label="Remove from cart"
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "remove",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user?.uid
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
                {/* </div> */}
              </Card>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ViewProduct;
