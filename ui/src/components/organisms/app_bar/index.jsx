/* eslint-disable no-debugger */


import React  from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { ReactComponent as NceLogo } from "../../../assets/light-nce-logo.svg";

import PropTypes from "prop-types";
import StyledAppBar from "./styles";

const NavigationBar = ({ open, toggleDrawer }) => {
  return (
    <StyledAppBar position="absolute" open={open}>
      <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
            Masters_2022
        </Typography>
        <NceLogo />
      </Toolbar>
    </StyledAppBar>
  );
};

NavigationBar.propTypes = {
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
};

export default NavigationBar;
