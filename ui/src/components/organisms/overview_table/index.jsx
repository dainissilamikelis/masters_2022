/* eslint-disable no-unused-vars */
import React from 'react'

import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PropTypes from 'prop-types'

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { MAINTENANCE_FIELD_ENUM } from "constant_variables/maintenance"
import { date_formatter } from 'api';


const MaintenanceOverviewTable = ({ maintenances, handleDelete, loading }) => {
  if (loading) {
    return <Skeleton variant="rectangular" height={400} />
  }

  return (
  <TableContainer component={Paper} sx={{ marginTop: "1em"}}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell> Id </TableCell>
        <TableCell> Start Date (UTC) </TableCell>
        <TableCell> End Date (UTC) </TableCell>
        <TableCell> Probe </TableCell>
        <TableCell> Services </TableCell>
        <TableCell> URLs </TableCell>
        <TableCell> Comments </TableCell>
        <TableCell> Outage </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {maintenances.map((form, index) => (
        <TableRow
          key={form.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, 
          backgroundColor: `${form.duration > 86399 ? "#ffe6e6" : ""}`}}
        >
          <TableCell>{index}</TableCell>
          <TableCell sx={{ minWidth: 210 }}>
            {date_formatter(form[MAINTENANCE_FIELD_ENUM.maintenance_starttime])}
          </TableCell>
          <TableCell sx={{ minWidth: 210 }}>
            {date_formatter(form[MAINTENANCE_FIELD_ENUM.maintenance_endtime])}
          </TableCell>
          <TableCell>
            {form["probe"]}
          </TableCell>
          <TableCell>
            {form["service"]}
          </TableCell>
          <TableCell>
            {form["url_affected"].map((u) => <p key={u}>{u}</p>)}
          </TableCell>
          <TableCell>
            {form["comments"]}
          </TableCell>
          <TableCell>
            {form["outage"].toString()}
          </TableCell>
          <TableCell>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteForeverIcon sx={{ color: "red" }}/>
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>);
}


MaintenanceOverviewTable.propTypes = {
  maintenances: PropTypes.array,
  handleDelete: PropTypes.func,
  loading: PropTypes.bool,
}
export default MaintenanceOverviewTable;