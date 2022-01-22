

import React, { useState} from 'react';
import { atom } from "recoil"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LogbookForm from '../logbook_form';

import { useRecoilState } from "recoil";
import PropTypes from "prop-types";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LogbookViewModal = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logbook_form_edit = atom({
    key: "",
    default: {
      loading: false,
      ...data,
    },
  });

  const [form, setForm] = useRecoilState(logbook_form_edit);

  const handle_form_change = (key, value) => {
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const submit = (test) => {
   //
  };

  const { loading } = form;
 
  return (
    <React.Fragment>
      <Button onClick={handleOpen} primary> View </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <LogbookForm submit={submit} loading={loading} form={logbook_form_edit} handleChange/> 
        </Box>
      </Modal>
    </React.Fragment>
  );
}

LogbookViewModal.propTypes = {
  data: PropTypes.object,
};


export default LogbookViewModal;