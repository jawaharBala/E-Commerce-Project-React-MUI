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
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuth } from "../contexts/AuthContext";

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
          width: isMobile ? "40vh" : "30vh",
          borderWidth: "2px",
          borderStyle: "solid",
          margin: "5px",
          borderRadius: "3vh",
          borderColor: "white",
          ":hover": { backgroundColor: "rgb(244, 240, 193)" },
          // height:'60vh'
        }}
      >
        <CardHeader
          title={
            <Chip
            clickable
              sx={{ ":hover": { cursor: "pointer" } , fontSize:18, fontWeight:'bold',}}
             label={prod.title}
            />
          }
          onClick={() => {
            navigate(`/product/${prod.id}`);
          }}
        ></CardHeader>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <CardMedia
            sx={{ width: "full", marginRight: "auto", marginLeft: "auto" }}
            component="img"
            alt={`${prod.title}`}
            height="250px"
            image={prod.images[0]}
          />
          <CardContent>
            <div
              // style={{
              //   display: "flex",
              //   flexDirection: "row",
                
              // }}
            >
              <Chip
            sx={{
              backgroundColor: "yellow",
              fontSize: 20,
              marginLeft:'none',
              marginTop: "4px",
              
            }}
            label={`$ ${Number(prod.price).toFixed(2)}`}
          />
              <Button
                size="small"
                sx={{
                  marginTop: "2px",
                  marginLeft:'2px'
               
                }}
                aria-label="add to cart"
                onClick={() => {
                  updateCart("change", prod, cart, updateCartItems, user?.uid);
                }}
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                disabled={!user}
              >
                Add to cart
              </Button>         
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
