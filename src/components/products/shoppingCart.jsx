import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Snackbar,
  Link as LinkMui,
  CircularProgress,
  Box,
  useMediaQuery,
  Chip,
  CssBaseline
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/IconButton";
import { ProductsStore } from "./ProductsContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);
  const context = useContext(ProductsStore);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:650px)");

  useEffect(() => {
    getCurrentCart();
  }, [user]);

  const getCurrentCart = async () => {
    try {
      await context.ProductUtils.getCart(user?.uid,context.updateCartItems);
      setLoadingCart(false);
    } catch (error) {
     
      console.log(error);
      setLoadingCart(false);
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
      {loadingCart ? (
        <div className="spinner">
          <Box sx={{ justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <>
          {context.cart && context.cart.length > 0 ? (
            context.cart.map((product) => {
              return (
                <>
                  <Card
                    key={product.id}
                    sx={{
                     width: isMobile ? ('40vh') : ('100vh'),
                      paddingTop: "3vh",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <CardHeader
                      title={product.title}
                      subheader={ <Chip
                        sx={{ backgroundColor: "yellow", fontSize: 20 }}
                        label={`$ ${product.price}`}
                      />}
                    ></CardHeader>
                    <div
                    style={{ display: "flex", flexwrap: "wrap" }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: "25vh" }}
                        height="auto"
                        image={product.image}
                      />
                      <CardContent>
                        <CardHeader
                          subheader={product.description}
                          fontSize={10}
                          width="auto"
                          variant="subtitle2"
                          color="text.secondary"
                        ></CardHeader>
                      </CardContent>
                    </div>
                    <CardContent>
                      <Button
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "minus",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user.uid
                          );
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                      {product.cart}
                      <Button
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "add",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user.uid
                          );
                        }}
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        color="error"
                        aria-label="Remove from cart"
                        onClick={() => {
                          context.ProductUtils.updateCart(
                            "remove",
                            product,
                            context.cart,
                            context.updateCartItems,
                            user.uid
                          );
                        }}
                        variant="outlined"
                        startIcon={<RemoveShoppingCartIcon color="error" />}
                      >
                        Remove from cart
                      </Button>
                      <IconButton aria-label="share">
                        <Snackbar
                          open={open}
                          autoHideDuration={3000}
                          onClose={handleClose}
                          message="Product added to cart!"
                          action={action}
                        />
                        <ShareIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                  <CssBaseline/>
                </>
              );
            })
          ) : (
            <div style={{ marginTop: "20%", marginLeft: "25%" }} key={1}>
              <Card
                sx={{
                  maxWidth: 650,
                  paddingTop: "2vh",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  margin: "2vh",
                  borderRadius: "3vh",
                  borderColor: "white",
                }}
              >
                <CardHeader
                  sx={{ justifyContent: "center", alignContent: "center" }}
                  title="Cart is empty!!"
                  subheader="Add items to cart?"
                ></CardHeader>
                <LinkMui
                  sx={{ textDecoration: "none", marginLeft: "15px" }}
                  component={Link}
                  size="large"
                  to="/products"
                >
                  <Button variant="contained"> Go to Products</Button>
                </LinkMui>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ShoppingCart;
