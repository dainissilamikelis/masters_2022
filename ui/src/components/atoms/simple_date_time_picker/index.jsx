import React from "react";
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import PropTypes from "prop-types";



const SimpleDateTimePicker = ({ label, value, id, handleChange, disabled }) => {

  return (
    <DateTimePicker
      id={id}
      ampm={false}
      renderInput={(props) => <TextField {...props} fullWidth />}
      label={label}
      value={value}
      disabled={disabled}
      onChange={(newValue) => {
        handleChange(id, newValue);
      }}
    />
  );
};

SimpleDateTimePicker.propTypes = {
  label:          PropTypes.string.isRequired,
  value:          PropTypes.any,
  handleChange:   PropTypes.func,
  id:             PropTypes.string,
  disabled:       PropTypes.bool,
};

export default SimpleDateTimePicker;
