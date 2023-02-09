import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FormControlLabel,
  Link as LinkMUI,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";


export default function SearchAppBar() {

 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <LinkMUI style={{ color: "white" }} component={Link} to="/home">
              HOME
            </LinkMUI>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0.05, display: { xs: "none", sm: "block" } }}
          >
            <LinkMUI style={{ color: "white" }} component={Link} to="/todos">
              TODOS
            </LinkMUI>
          </Typography>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
          >
            <LinkMUI style={{ color: "white" }} component={Link} to="/products">
              PRODUCTS
            </LinkMUI>
          </Typography>
          <Typography
            sx={{ flexGrow: 0.05, display: { xs: "none", sm: "block" } }}
          >
            <FormControlLabel control={<Switch />} label="Dark Mode" />
          </Typography>
        </Toolbar>   
      </AppBar>
    </Box>
  );
}
