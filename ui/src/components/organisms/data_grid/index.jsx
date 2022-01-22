import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    '& .cold': {
      '& svg':{
        color: 'red !important',
      }
    },
    '& .hot': {
      '& svg':{
        color: 'green !important',
      }
    },
    '& .jira_marked': {
      backgroundColor: "#e6f5ff",
    }
  },
});

const makeRows = (data) => {
  const rows = [];
  data &&
    data.forEach((e, i) => {
      rows.push({ id: i, ...e });
    });

  return rows;
};

const makeColumns = (data, order_map) => {
  if (order_map) {
    return order_map;
  }

  const columns = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 50,
    },
  ];

  Object.keys(data[0]).forEach((k) => {
    columns.push({
      field: k,
      headerName: k,
      minWidth: 200,
    });
  });

  return columns;
};


export default function SimpleDataGrid({ loading, data, order, id, getAllData, page, setPage }) {
  const classes = useStyles();

  if (loading) {
    return <Skeleton variant="rect" width="100%" height="300px" />;
  }

  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          className={classes.root}
          components={{
            Toolbar: GridToolbar,
          }}
          rows={makeRows(data, id)}
          columns={makeColumns(data, order)}
          page={page}
          autoPageSize
          onPageChange={(newPage) => {
            setPage(newPage);
            getAllData(setPage);
          }}
          getRowClassName={(params) => {
            if (params.row["createdBy"] === "jira-webhook") {
              return "jira_marked";
            }
            return;
          }}
        />
      </div>
    </div>
  )
}

SimpleDataGrid.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.bool,
  getAllData: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
};
