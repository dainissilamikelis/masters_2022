import React, { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import { toast } from "react-toastify";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import FormSkeleton from "components/atoms/form_skeleton";

import { findWebProbeData } from "api/webprobe_api";

import GridField from "components/molecules/grid_field";
import FIELD_SIZE from "constant_variables";
import { web_probe_fields } from "constant_variables/web_probe_fields";


const ProbeView = () => {
  const { id } = useParams();
  const [form_data, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get_entry = async(route_id) => {
        const split = route_id.split("&")
        const PK = split[0].split("=")[1];
        const SK = split[1].split("=")[1];
        try {
          const resp = await findWebProbeData(PK, SK);
          // eslint-disable-next-line no-debugger
          debugger;
          setForm(resp)
          setLoading(false)
          toast.success("Success!")
        } catch(err) {
          toast.error("Failed!")
        }
    }
    if (id) get_entry(id)
     
    }, [id])


  if (loading || !form_data) {
    return <FormSkeleton />
  }

  return (
   <div style={{ textAlign: "center"}}>
      <h3>Viewing entry <strong>{form_data.SK}</strong> </h3>
        <ImageList cols={3} gap={8} sx={{ margin: "auto", width: "80%" }}>
          {form_data.files.map((item) => (
            <ImageListItem key={item.url} onClick={() => window.open(item.url)} >
              <img
                src={item.url}
                srcSet={item.url}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
     <form style={{ marginTop: "2em"}}>
     <Grid container spacing={3} alignItems="center" style={{ width: "100%" }}>
        {Object.keys(web_probe_fields).map((f) => 
          {
          if (form_data[f]) return(
            <GridField key={f} loading={loading} size={FIELD_SIZE.large}>
              <TextField
                id="f"
                label={web_probe_fields[f].header}
                value={form_data[f]}
                fullWidth
              />
              </GridField> 
            )}
          )}
          </Grid>
          <TableContainer sx={{ marginTop: "2em", textAlign: "center"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> SUCCESS </TableCell>
                  <TableCell> ACTION </TableCell>
                  <TableCell> DESCRIPTION </TableCell>
                  <TableCell> GOT </TableCell>
                  <TableCell> EXPECTED </TableCell>
                </TableRow>
              </TableHead>
          <TableBody>
          {form_data.evaluations.map((row) => (
            <TableRow key={row.action.action} sx={{ textAlign: "center"}}>
              <TableCell>{row.success.toString()}</TableCell>
              <TableCell>{row.action.action}</TableCell>
              <TableCell>{row.action.description}</TableCell>
              <TableCell>{row.url}</TableCell>
              <TableCell>{row.action.action_description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </form>
   </div>
  );
};

export default ProbeView;
