/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import { toast } from 'react-toastify';
import { Button, ButtonGroup, CssBaseline, FormControlLabel, Switch } from "@mui/material";

import postQuery from "../../../api/query";


import maintenance_order, { PROBE_OPTIONS } from "constant_variables/maintenance";
import SimplePageTitle from "components/atoms/simple_page_title";
import _cloneDeep from "lodash.clonedeep";
import EditableDataGrid from "components/organisms/editable_data_grid";
import MarkCell from "components/atoms/mak_cell";

import PropTypes from 'prop-types'


MaintenanceTable.propTypes = {
  outage: PropTypes.bool,
}

export default function MaintenanceTable() {
  const [editData, setEditData] = useState([]);
  const [showData, setShowData] = useState([]);
  const limit = 0;
  const [loading, setLoading] = useState(true);
  const [outage, setOutage] = useState(false);
  const [key, setKey] = useState("webprobe_kpi_mnt_conf")


  const getViewData = React.useCallback(async() => {
    setLoading(true);
    let error = false;
    try {
      const resp = await postQuery({
        PK: key,
        DataAdjuster: "maintenance",
        queries: [
          { id: "outage",  values: [outage], attribute: "=" }
        ],
        limit,
      }, true);

      const rows = resp.map((e, i) => ({ id: i, ...e, "__mark__": false }))
      setShowData(rows);
      setEditData(_cloneDeep(rows));
    } catch (err) {
      error = true;
      console.trace(err);
    } finally {
      setLoading(false);
      if (error) toast.error("Failed");
    }
  }, [key, outage, limit])

  const handle_edit = (edit_change) => {
    setEditData((old) => { 
      Object.keys(edit_change).forEach(index_key => {
        Object.keys(edit_change[index_key]).forEach((k) => {
          old[index_key][k] = edit_change[index_key][k].value;
        });
      })
      return old;
    })
  }

  const handle_mark = (value, props) => {
    const { row : { id }} = props;
    const new_element = {...editData[id], "__mark__": value }
    const newData = [...editData];
    newData[id] = new_element;
    setEditData(newData)
  }

  useEffect(() => {
    getViewData();
  },[getViewData]);

  const adjusted_order = [...maintenance_order, {
    field: "Mark for Delete",
    id: '__mark__',
    minWidth: 160,
    hide: true,
    renderCell: (e) => ( <MarkCell props={e} onMark={handle_mark} />)
  }]


  return (
    <React.Fragment>
      <CssBaseline />
      <SimplePageTitle title={"Maintenance / Outage Table"}/>
      <div>
        <FormControlLabel control={<Switch />} checked={outage} label="View Outages" onClick={() => setOutage(!outage)} />
      </div>
      {/* <div>
        <Button onClick={() => setLimit(0)} sx={{ backgroundColor: "#1e4d7d !important", color: "white !important", margin: "1em 0 1em 0em" }} > Request all data </Button>
      </div> */}
      <ButtonGroup>
      {
        PROBE_OPTIONS.map((k) => 
          <Button 
            variant="contained"
            key={k.key}
            onClick={() => setKey(k.key)}
            sx={{ backgroundColor:  k.key === key ? "29abe2" : "#1e4d7d", color: "white"}}
          >
            {k.alias}
          </Button>)
      }
      </ButtonGroup>
      <EditableDataGrid
        edit={false}
        loading={loading}
        rows= {showData}
        columns={adjusted_order}
        id={false}
        onEdit={handle_edit}
        onMark={handle_mark}
      />
    </React.Fragment>
  );
}
