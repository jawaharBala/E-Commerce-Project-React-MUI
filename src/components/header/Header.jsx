import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { memo } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
let activeStyle = {
  textDecoration: "none",
  backgroundColor: "white",
  color: "blue",
  padding: "9px",
  borderRadius: "3px",
};
let inactiveStyle = {
  textDecoration: "none",
  backgroundColor: "black",
  color: "white",
  padding: "9px",
  borderRadius: "3px",
};
function SearchAppBar({ count }) {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <NavLink
              className="nav-link"
              to="/home"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              HOME
            </NavLink>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <NavLink
              className="nav-link"
              to="/todos"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              TODOS
            </NavLink>
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <NavLink
              className="nav-link"
              to="/products"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              PRODUCTS
            </NavLink>
          </Typography>
          <Typography
            sx={{
              marginLeft: "auto",
              display: { xs: "none", sm: "block" },
              marginTop: "3px",
            }}
          >
            <NavLink
              className="nav-link"
              to="/cart"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              CART
              <IconButton aria-label="cart" sx={{ marginTop: "3px" }}>
                <Badge badgeContent={count} color="primary">
                  <ShoppingCartIcon color="primary" />
                </Badge>
              </IconButton>
            </NavLink>
            <NavLink
              className="nav-link"
              to="/login"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              Login
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default memo(SearchAppBar);
