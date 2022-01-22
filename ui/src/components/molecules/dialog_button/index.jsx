import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import PropTypes from 'prop-types'


const DialogButton = ({ color, text, title, onConfirm, callToAction }) => {
    const [open, setOpen] = useState(false);
    return (  
        <> 
        <Button color={color} onClick={() => setOpen(true)}>{callToAction}</Button>
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
        {title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {text}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={() => setOpen(false)}
            sx={{ color: "green" }}>
            Cancel
        </Button>
        <Button onClick={() => { onConfirm(), setOpen(false) }} sx={{ color: "red" }} autoFocus>
            Confirm
        </Button>
        </DialogActions>
    </Dialog> 
  </>
  );
}
 
DialogButton.propTypes = {
    color: PropTypes.string,
    onConfirm: PropTypes.func,
    text: PropTypes.string,
    title: PropTypes.string,
    callToAction: PropTypes.string,
}

export default DialogButton;