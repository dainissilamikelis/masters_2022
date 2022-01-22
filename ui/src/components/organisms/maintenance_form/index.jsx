import React from "react";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import SimpleDateTimePicker from "components/atoms/simple_date_time_picker";
import SimpleSingleSelect from "components/atoms/simple_single_select";
import SimpleSelectWithAll from "components/atoms/simple_select_with_all";

import GridField from "components/molecules/grid_field";

import PropTypes from "prop-types";

import { MAINTENANCE_FIELD_ENUM, PROBE_OPTIONS } from "constant_variables/maintenance"

import FIELD_SIZE from "constant_variables";

const MaintenanceForm = ({ form, submit, loading, handleChange, all, handleAllChange, service_options, disable_url, disabled, urls, clearForm }) => {
    return (
      <form
        noValidate
        autoComplete="off"
        style={{ width: "100%" }}
      >
        <Grid container spacing={3} alignItems="center" style={{ width: "100%" }}>
        <GridField loading={loading} size={FIELD_SIZE.half}>
          <SimpleDateTimePicker
                id="maintenance_starttime"
                label="Start date (UTC)"
                value={form[MAINTENANCE_FIELD_ENUM.maintenance_starttime]}
                handleChange={handleChange}
                disabled={disabled}
            />
          </GridField>
          <GridField loading={loading} size={FIELD_SIZE.half}>
            <SimpleDateTimePicker
              id="maintenance_endtime"
              label="End date (UTC)"
              value={form[MAINTENANCE_FIELD_ENUM.maintenance_endtime]}
              handleChange={handleChange}
              disabled={disabled}
            />
          </GridField>
          <GridField loading={loading} size={FIELD_SIZE.half}>
            <SimpleSingleSelect
              id="probe"
              label="Probe"
              value={form["probe"]}
              options={PROBE_OPTIONS}
              handleChange={handleChange}
              disabled={disabled}
            />
          </GridField>
          <React.Fragment>
            <GridField loading={loading} size={FIELD_SIZE.half}>
              <SimpleSingleSelect
                id="service"
                label="Services"
                value={form["service"]}
                options={service_options}
                handleChange={handleChange}
                disabled={disabled}
              />
            </GridField>
            <GridField loading={loading} size={FIELD_SIZE.full}>
              <SimpleSelectWithAll
                id="url_affected"
                label="Urls"
                disabled={disable_url || disabled}
                value={form["url_affected"]}
                options={urls || []}
                handleChange={handleChange}
                all={all}
                handleAllChange={handleAllChange}
              />
            </GridField>
          </React.Fragment>
          <GridField loading={loading} size={FIELD_SIZE.full}>
            <TextField
              id="comments"
              label="Comment"
              value={form["comments"]}
              onChange={(e) => handleChange("comments", e.target.value)}
              fullWidth
              disabled={disabled}
            />
          </GridField>
          <GridField loading={loading} size={FIELD_SIZE.full}>
            <FormGroup>
              <FormControlLabel control={<Switch checked={form["outage"]}  onChange={(e) => handleChange("outage", e.target.checked)} />} label="Outage" />
            </FormGroup>
          </GridField>
          <Grid item xs={12} sm={12} lg={12}>
            <Button variant="contained" disabled={disabled || loading} onClick={() => submit()}> Add Maintenance </Button>
            <Button variant="contained" color="error" disabled={disabled || loading} onClick={() => clearForm()}> Clear form  </Button>
          </Grid>
        </Grid>
      </form> )
};

MaintenanceForm.propTypes = {
    loading: PropTypes.bool,
    form: PropTypes.object,
    submit: PropTypes.func,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    editMode: PropTypes.bool,
    probe: PropTypes.object,
    all: PropTypes.bool, 
    handleAllChange: PropTypes.func,
    service_options: PropTypes.array,
    disable_url: PropTypes.bool,
    urls: PropTypes.array,
    clearForm: PropTypes.func,
  };
 
export default MaintenanceForm;