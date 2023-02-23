import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  ButtonGroup,
  CardHeader,
  Link as LinkMui,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuth } from "../contexts/AuthContext";
import Chip from "@mui/material/Chip";

const ProductCard = ({
  prod,
  updateCount,
  products,
  updateCart,
  updateProducts,
  productInCart,
  cart,
  updateCartItems,
}) => {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          width: isMobile ? ('40vh'): ('50vh'),
          borderWidth: "2px",
          borderStyle: "solid",
          margin: "1vh",
          borderRadius: "3vh",
          borderColor: "white",
          ":hover": { backgroundColor: "rgb(244, 240, 193)" },
        }}
      >
        <CardHeader
          title={prod.title}
          onClick={() => {
            navigate(`${prod.id}`);
          }}
          sx={{ ":hover": { cursor: "pointer" }, fontStyle: "Helvatica" }}
        ></CardHeader>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <CardMedia
            sx={{ width: "25vh" }}
            component="img"
            alt={`${prod.title}`}
            height="auto"
            image={prod.image}
          />
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                sx={{ marginTop: "2px" }}
                aria-label="add to cart"
                onClick={() => {
                  updateCart("change", prod, cart, updateCartItems, user?.uid);
                }}
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
              >
                Add to cart
              </Button>
              <Chip
                sx={{ backgroundColor: "yellow", fontSize: 20 , marginTop:'4px'}}
                label={`$ ${prod.price}`}
              />
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
