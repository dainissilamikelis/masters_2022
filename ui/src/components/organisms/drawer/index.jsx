import React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from "@mui/material/Toolbar";
import IconButton  from "@mui/material/IconButton";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";

import SecondaryListItems from "components/molecules/navigation_list";
import MainListItems from "components/molecules/navigation_list/main_list"
import secondaryLists from "components/molecules/navigation_list/routes"

import PropTypes from "prop-types";
import StyledDrawer from "./styles";


const MenuDrawer = ({ open, toggleDrawer }) => {
  return (
  <StyledDrawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftRounded />
      </IconButton>
    </Toolbar>
    <Divider />
    <List><MainListItems /></List>
    <Divider />
    <List>
    {secondaryLists.map((s) =>
        <React.Fragment key={s.name}>
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {s.name}
                </ListSubheader>
              }>
              <SecondaryListItems list={s.items}/>
            </List>
          <Divider />
        </React.Fragment>
      )}
    </List>
  </StyledDrawer>);
};

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func
};


export default MenuDrawer;
