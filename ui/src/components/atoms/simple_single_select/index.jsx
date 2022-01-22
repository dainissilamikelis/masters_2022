
import React from 'react';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import PropTypes from 'prop-types';

  function getStyles(name, values) {
    return {
      fontWeight:
        values.indexOf(name) === -1
          ? 500
          : 100,
    };
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


const SimpleSingleSelect = ({
    id,
    label,
    value,
    handleChange,
    options,
    disabled,
}) => {
    return (
        <FormControl fullWidth  >
            <InputLabel id={`${id}-input`}>{label}</InputLabel>
            <Select
                labelId={label}
                id={id}
                value={value}
                onChange={(e) => handleChange(id, e.target.value)}
                input={<Input id={`select=${label}`} />}
                MenuProps={MenuProps}
                disabled={disabled}
                >
                {options.map(({ key, alias }) => (
                    <MenuItem key={key} value={key} style={getStyles(key, options)}>
                    {alias}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
}

SimpleSingleSelect.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
  };

 
export default SimpleSingleSelect;