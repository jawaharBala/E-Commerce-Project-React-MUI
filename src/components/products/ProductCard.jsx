import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Link as LinkMui } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ prod }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345, paddingTop: "2vh" , borderWidth:'2px', borderStyle:'solid'}}>
        <CardHeader title={prod.title} subheader={`Price:$ ${prod.price}`}></CardHeader>
        <CardMedia
        sx={{width:'300px'}}
          component="img"
          alt="Picture"
          height="auto"
         
          image={prod.image}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {prod.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <LinkMui component={Link} to={`${prod.id}`} size="small">
            <Button>View product</Button>
          </LinkMui>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
