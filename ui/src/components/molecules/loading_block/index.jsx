import React from "react";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from 'prop-types'


const LoadingBlock = ({ children, loading }) => {
  if (loading) {
    return <Skeleton variant="rect" width="100%" height="50px" />;
  }

  return children;
};
LoadingBlock.propTypes = {
  children: PropTypes.any, 
  loading: PropTypes.bool,
}

export default LoadingBlock;
