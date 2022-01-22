import React from 'react';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PropTypes from 'prop-types';
import { Button } from '@mui/material';

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


const SingleSelectWithAll = ({
    id,
    label,
    value,
    handleChange,
    options,
    disabled,
    handleAllChange,
}) => {
    return (
      <Grid container spacing={3} alignItems="center" style={{ width: "100%" }}>
        <Grid item xs={11}>
        <FormControl fullWidth>
          <InputLabel id={label}>{label}</InputLabel>
          <Select
            labelId={label}
            id={id}
            multiple
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            input={<Input id={`select=${label}`} />}
            MenuProps={MenuProps}
            disabled={disabled}
          >
            {options.map(({ key, alias }) => (
              <MenuItem key={key} value={key} >
                {alias}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" disabled={disabled} onClick={() => handleAllChange()}> All </Button>
        </Grid>
      </Grid>
    );
}

SingleSelectWithAll.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    handleChange: PropTypes.func,
    handleAllChange: PropTypes.func,
  };

 
export default SingleSelectWithAll;