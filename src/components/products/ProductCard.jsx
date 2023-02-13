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
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";

const ProductCard = ({ prod,updateCount,products,updateCart ,setProducts}) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 650,
          paddingTop: "2vh",
          borderWidth: "2px",
          borderStyle: "solid",
          margin:'2vh',
          borderRadius:'3vh'
        }}
      >
        <CardHeader
          title={prod.title}
          subheader={`Price:$ ${prod.price}`}
        ></CardHeader>
        <div style={{display:'flex', flexwrap:'wrap'}}>
          <CardMedia
            sx={{ width: 300 }}
            component="img"
            alt="Picture"
            height="auto"
            image={prod.image}
          />
          <CardContent>
            <Typography width='300px' variant="body1" color="text.secondary">
              {prod.description}
            </Typography>
            <CardActions>
          <Button size="small">Share</Button>
          <LinkMui sx={{textDecoration:'none'}} component={Link} to={`${prod.id}`} size="large">
            <Button>View product</Button>
          </LinkMui>
        </CardActions>
          </CardContent>       
        </div>
        <CardContent>
        <Button
                    onClick={() => {
                      updateCount("minus", prod,products);
                    }}
                  >
                    <RemoveIcon />
                  </Button>{prod.cart}
                  <Button
                    onClick={() => {
                      updateCount("add", prod,products,setProducts);
                    }}
                  >
                    <AddIcon />
                  </Button>
                  <IconButton aria-label="add to cart"  onClick={()=>{updateCart('add',prod)}}>
                    <AddShoppingCartIcon sx={{ margin: "2px" }}  />
                  </IconButton>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
