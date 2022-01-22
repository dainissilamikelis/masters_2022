import React from 'react'
import Typography from "@mui/material/Typography";

import PropTypes from 'prop-types';

const SimplePageTitle = ({ title }) => (
    <Typography variant="h4" component="h4" sx={{ 
        paddingTop: "15px", 
        paddingBottom: "25px", 
        color: "#1e4d7d",
         textAlign: "center"
    }}>{title}</Typography>
);
 
SimplePageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SimplePageTitle;