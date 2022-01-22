import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    '& .cold': {
      backgroundColor: "white",
    },
    '& .marked': {
      textDecoration: "line-through",
      backgroundColor: "white"
    },
  },
});


export default function EditableDataGrid({ loading, rows, columns, edit, onEdit }) {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(12);

  

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
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[12, 20, 30,  50, 100]}
          getCellClassName={(params) => {
            if (edit && params.isEditable) {
              return "cold";
            }
            return;
          }}
          getRowClassName={(params) => {
            if (params.row["__mark__"]) {
              return "marked";
            }
            return;
          }}
          onEditRowsModelChange={onEdit}
        />
      </div>
    </div>
  )
}

EditableDataGrid.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.bool,
  edit: PropTypes.bool,
  onEdit: PropTypes.func,
  onMark: PropTypes.func,
};
