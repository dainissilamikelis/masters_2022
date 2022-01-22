
import React from "react";
import { NavLink } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import PropTypes from "prop-types";

const SecondaryListItems = ({ list }) => {
  return (
    <React.Fragment>
      {list.map((m) => (
        <Tooltip key={m.title} title={m.title} placement="right">
          <ListItem
            key={m.route}
            button
            component={NavLink}
            to={m.route}
            exact
            activeStyle={{
              fontWeight: "bold",
              backgroundColor: "#e6f2ff"
            }}
          >
            <ListItemIcon>
              <m.icon />
            </ListItemIcon>
            <ListItemText primary={m.title} />
          </ListItem>
        </Tooltip>
      ))}
    </React.Fragment>
  );
};

SecondaryListItems.propTypes = {
  list: PropTypes.array.isRequired,
}

export default SecondaryListItems;


