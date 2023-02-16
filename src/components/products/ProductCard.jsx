import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Link as LinkMui } from "@mui/material";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const ProductCard = ({
  prod,
  updateCount,
  products,
  updateCart,
  setProducts,
  productInCart,
  cart,
  setCart
}) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 560,
          borderWidth: "2px",
          borderStyle: "solid",
          margin: "1vh",
          borderRadius: "3vh",
          borderColor:'gold'
        }}
      >
        <CardHeader
          title={prod.title}
          subheader={`Price:$ ${prod.price}`}
        ></CardHeader>
        <div style={{ display: "flex", flexwrap: "wrap" }}>
          <CardMedia
            sx={{ width: 220 }}
            component="img"
            alt={`${prod.title}`}
            height="auto"
            image={prod.image}
          />
          <CardContent>
            <Typography width="290px" variant="body1" color="text.secondary">
              {prod.description}
            </Typography>
            <CardActions>
              <Button size="small">Share</Button>
              <LinkMui
                sx={{ textDecoration: "none" }}
                component={Link}
                to={`${prod.id}`}
                size="large"
              >
                <Button>View product</Button>
              </LinkMui>
            </CardActions>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          <Button
            onClick={() => {
              updateCount("minus", prod, products, setProducts);
            }}
          >
            <RemoveIcon />
          </Button>
          {prod.cart}
          <Button
            onClick={() => {
              updateCount("add", prod, products, setProducts);
            }}
          >
            <AddIcon />
          </Button>
          <Button
            sx={{ margin: "4px" }}
            aria-label="add to cart"
            onClick={() => {
              updateCart("add", prod,cart,setCart);
            }}
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
          >
            Add to cart
          </Button>
          {productInCart(prod,cart)?.length> 0 ? (<Button
            color="error"
            aria-label="Remove from cart"
            onClick={() => {
              updateCart("remove", prod,cart,setCart);
            }}
            variant="outlined"
          
            startIcon={<RemoveShoppingCartIcon color="error" />}
          >
            Remove from  cart
          </Button>) :(null)}
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
