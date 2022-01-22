

import React from "react";
import Grid from "@mui/material/Grid";
import LoadingBlock from "../loading_block";

import PropTypes from "prop-types";
import FIELD_SIZE  from "constant_variables";

const GridField = ({ size, loading, children }) => {
  const active_size = size || FIELD_SIZE.full;
  const { xs, sm, md, lg, xl } = active_size;
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} >
      <LoadingBlock loading={loading}>{children}</LoadingBlock>
    </Grid>
  );
};

GridField.propTypes = {
  size: PropTypes.object,
  children: PropTypes.any,
  loading: PropTypes.bool,
};

export default GridField;
