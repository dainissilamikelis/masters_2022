import React from "react";
import Checkbox from "@mui/material/Checkbox";

import PropTypes from 'prop-types'

const MarkCell = ({ props, onMark }) => {
  const { row } = props;
 return (
    <div>
      <Checkbox checked={row["__mark__"]} color="error" onClick={(e) => onMark(e.target.checked, props)}  />
    </div>
 )
};

MarkCell.propTypes = {
  props: PropTypes.object,
  value: PropTypes.any,
  row: PropTypes.object,
  onMark: PropTypes.func,
}

export default MarkCell;
