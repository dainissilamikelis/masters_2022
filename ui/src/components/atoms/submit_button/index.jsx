import Button from '@mui/material/Button';
import React from 'react';

import PropTypes from "prop-types";

const SubmitButton = ({ label, onClick, disabled }) => {
    return (
        <Button
            id="submit"
            type="submit"
            variant="contained"
            color="primary"
            disabled={disabled}
            onClick={(e) => onClick(e)}
            sx={{
                backgroundColor: "#1e4d7d"
            }}
        >
            {label}
        </ Button>
    );
}
 
SubmitButton.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };


export default SubmitButton;