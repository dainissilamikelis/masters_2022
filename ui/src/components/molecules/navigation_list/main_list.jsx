
import React from 'react'

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from 'react-router-dom';

const MainListItems = () => {
    return ( 
        <React.Fragment>
            <ListItem exact component={NavLink} button to="/"activeStyle={{
                fontWeight: "bold",
                backgroundColor: "#e6f2ff"
                }} >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
            </ListItem>
        </React.Fragment>
)
    };
 

export default MainListItems;