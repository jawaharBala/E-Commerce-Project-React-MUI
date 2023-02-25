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
          width: isMobile ? "40vh" : "40vh",
          borderWidth: "2px",
          borderStyle: "solid",
          margin: "1vh",
          borderRadius: "3vh",
          borderColor: "white",
          ":hover": { backgroundColor: "rgb(244, 240, 193)" },
          // height:'60vh'
        }}
      >
        <CardHeader
          title={
            <Typography
              sx={{ ":hover": { cursor: "pointer" } }}
              component="div"
            >
              {prod.title}
            </Typography>
          }
          onClick={() => {
            navigate(`${prod.id}`);
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
            sx={{ width: "25vh", marginRight: "auto", marginLeft: "auto" }}
            component="img"
            alt={`${prod.title}`}
            height="250px"
            image={prod.image}
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <Button
                size="small"
                sx={{
                  marginTop: "2px",
                  marginRight: "auto",
                  marginLeft: "auto",
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
              <Chip
                sx={{
                  backgroundColor: "yellow",
                  fontSize: 20,
                  marginTop: "4px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
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
