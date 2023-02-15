import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Snackbar,
  Link as LinkMui,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/IconButton";
import { ProductsStore } from "./ProductsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(ProductsStore);

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
      {context.cart && context.cart.length > 0 ? (
        context.cart.map((product) => {
          return (
            <>
              <Card
                key={product.id}
                style={{
                  maxWidth: 800,
                  paddingTop: "3vh",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <CardHeader
                  title={product.title}
                  subheader={`Price:$ ${product.price}`}
                ></CardHeader>
                <div style={{ display: "flex", flexwrap: "wrap" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: "250px" }}
                    height="auto"
                    image={product.image}
                  />
                  <CardContent>
                    <Typography
                      width="350px"
                      variant="body1"
                      color="text.secondary"
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </div>
                <CardContent>
                  <Button
                    onClick={() => {
                      context.ProductUtils.updateCount(
                        "minus",
                        product,
                        context.cart,
                        context.setCart
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
                        context.cart,
                        context.setCart
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
                        context.setCart
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
            </>
          );
        })
      ) : (
        <div style={{ marginTop: "20%", marginLeft: "25%" }}>
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
  );
};

export default ShoppingCart;
