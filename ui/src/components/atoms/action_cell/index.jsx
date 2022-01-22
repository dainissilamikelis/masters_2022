/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";

import React from "react";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import PropTypes from 'prop-types'
import { ButtonGroup } from "@mui/material";
import { toast } from "react-toastify";


const ActionCell = ({ props, source }) => {
  const { row } = props;
  const { createdBy } = row;
  let settings = {
    target: "_blank"
  }
 
  let url = encodeURI(`/${source}/view/PK=${row.PK}&SK=${row.SK}`);
  if (source === "trace") {
    url = encodeURI(`/${source}/request/${row.request_id}`);
  }

  const handle_copy = (target_url) => {
    navigator.clipboard.writeText(target_url)
    toast.success("Link copied to clipboard!");
  }

  const open_window = (url) => {
    window.open(url);
  }

  

  return (
    <ButtonGroup fullWidth>
        <Button variant="text" onClick={() => open_window(url)}>View </Button>
        <IconButton aria-label="copy" onClick={() => handle_copy(`https://localhost${url}`)}>
          <ContentCopyIcon />
        </IconButton>
    </ButtonGroup>
    )
};

ActionCell.propTypes = {
  props: PropTypes.object,
  source: PropTypes.string,
  row: PropTypes.object,
}

export default ActionCell;
