import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Drawer,
  useMediaQuery,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  List,
  Divider,
  Icon,
  SvgIcon,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { memo } from "react";
import { useAuth } from "../contexts/AuthContext";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useDispatch, useSelector } from 'react-redux';
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";

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
  padding: "3px",
  borderRadius: "25%",
  margin: "1vh",
  borderStyle:'solid',
  borderColor:'yellow'
};
let inactiveStyle = {
  textDecoration: "none",
  backgroundColor: "black",
  color: "white",
  padding: "9px",
  borderRadius: "15%",
  margin: "1vh",
};
function SearchAppBar({cartCount }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery("(max-width:650px)");
  const dispatch = useDispatch();
  const drawerMenu = [
    { button: "Todos", icon: "PlaylistAddCheckIcon", link: "/todos" },
    { button: "Cart", icon: "ShoppingCartIcon", link: "/cart" },
  ];

  const count = useSelector((store)=>{
    return store.custom.cartCount
  });

  const cart = useSelector((store)=>{
    return store.custom.cart
  });

  useEffect(() => {
    cartCount(cart, updateCartCounts);
  }, [cart, user]);
  
  const updateCartCounts = (cartCount)=>{
    dispatch({
      type:'updateCartCount',
      payload:cartCount
    })
  };

  const userLogout = async () => {
    try {
      await logout();
      updateCartCounts([]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = (val) => {
    setOpenDrawer(val);
  };

  return (
    <>
      {isMobile ? (
        <Box sx={{ backgroundColor: "black" }}>
          <AppBar color="transparent" position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  toggleDrawer(true);
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                sx={{ Color: "black" }}
                open={openDrawer}
                onClose={() => {
                  toggleDrawer(false);
                }}
              >
                <List
                  onClick={() => {
                    toggleDrawer(false);
                  }}
                  sx={{ backgroundColor: "black", color: "white" }}
                >
                  {drawerMenu.map((elem, index) => {
                    return (
                      <>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <NavLink
                              className="nav-link"
                              to={elem.link}
                              style={({ isActive }) =>
                                isActive ? activeStyle : inactiveStyle
                              }
                            >
                              {elem.button}
                            </NavLink>
                            <ListItemIcon children={<ShoppingCartIcon />}>
                              {/* {React.createElement(elem.icon)} */}
                              <ShoppingCartIcon />
                            </ListItemIcon>
                            {/* <ListItemText primary={elem} /> */}
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                      </>
                    );
                  })}
                  <ListItem>
                    <Typography fontSize={10}>
                      {user ? (
                        <>
                          <Typography fontSize={10} sx={{ color: "white" }}>
                            {user.email}
                            <br />
                            <Button
                              onClick={() => {
                                userLogout();
                              }}
                            >
                              Logout?
                            </Button>
                          </Typography>
                        </>
                      ) : (
                        <NavLink
                          className="nav-link"
                          to="/login"
                          style={({ isActive }) =>
                            isActive ? activeStyle : inactiveStyle
                          }
                        >
                          Login
                        </NavLink>
                      )}
                    </Typography>
                  </ListItem>
                </List>
              </Drawer>
              <NavLink
                className="nav-link"
                to="/home"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                Home
              </NavLink>
              <NavLink
                className="nav-link"
                to="/products"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                Products
              </NavLink>
              <Typography sx={{ marginLeft: "auto" }}>
                <Link to="/cart">
                  <Badge badgeContent={count} color="primary">
                    <ShoppingCartIcon color="primary" />
                  </Badge>
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ backgroundColor: "black" }}>
          {/* <AppBar color="transparent" position="static"> */}
          <Toolbar sx={{height:'7vh'}}>
            {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
            <Typography fontSize={15} component="div">
              <NavLink
                className="nav-link"
                to="/home"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                Home
              </NavLink>
            </Typography>
            <Typography fontSize={15}  component="div">
              <NavLink
                className="nav-link"
                to="/todos"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                Todos
              </NavLink>
            </Typography>

            <Typography fontSize={15}  component="div">
              <NavLink
                className="nav-link"
                to="/products"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                Products
              </NavLink>
            </Typography>
            <Typography
              fontSize={15}
              sx={{
                marginLeft: "auto",
                marginTop: "3px",
              }}
            >
              <NavLink
                className="nav-link"
                to="/cart"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                CART
                <IconButton aria-label="cart" sx={{ marginTop: "3px" }}>
                  <Badge badgeContent={count} color="primary">
                    <ShoppingCartIcon color="primary" />
                  </Badge>
                </IconButton>
              </NavLink>
            </Typography>
            <Typography sx={{ margin: "2vh" }}>
              {user ? (
                <>
                  <Typography sx={{ color: "white" }}>
                    {user.email}
                    <br />
                    <Button
                      onClick={() => {
                        userLogout();
                      }}
                    >
                      Logout?
                    </Button>
                  </Typography>
                </>
              ) : (
                <NavLink
                  className="nav-link"
                  to="/login"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  Login
                </NavLink>
              )}
            </Typography>
          </Toolbar>
          {/* </AppBar> */}
        </Box>
      )}
    </>
  );
}
export default memo(SearchAppBar);
