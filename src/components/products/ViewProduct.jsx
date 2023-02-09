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
import ShareIcon from "@mui/icons-material/Share";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/material/IconButton";
import { ProductsStore } from "./ProductsContext";

const ViewProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const productsContext = useContext(ProductsStore);
  useEffect(() => {
    console.log(productsContext);
    getProduct();
  }, [productsContext]);

  const getProduct = async () => {
    console.log(productsContext);
    setLoading(true);
    if (productsContext) {
      let prod =  productsContext.product.filter((elem) => {
        console.log('context',elem);
        return elem.id === id;
      });
      setLoading(false);
      setProduct(prod);
    } else {
      try {

        const response = await axios.get(
          "https://fakestoreapi.com/products/" + id
        );
        console.log('fetch',response.data);
        setLoading(false);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
            <CardMedia
              component="img"
              sx={{ width: "250px" }}
              height="auto"
              image={product.image}
            />
            <CardContent>
              <IconButton aria-label="add to cart" onClick={addToCart}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message="Product added to cart!"
                  action={action}
                />
                <AddShoppingCartIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default ViewProduct;
