import { Button, ButtonGroup } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";


import SimpleDataGrid from "components/organisms/data_grid";

import SimplePageTitle from "components/atoms/simple_page_title";

import web_probe_order from "constant_variables/web_probe_fields";
import getWebProbeData, { buildWebProbeSolution, runWebProbeSolution } from "api/webprobe_api";
import { toast } from "react-toastify";

export default function WebProbeTable() {
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("NOT FOUND")
  const [page, setPage] = useState(0);

  const getViewData = useCallback(() => {
    const request = async() => {
      try {
        setLoading(true)
        const resp = await getWebProbeData({
          error: key,
        });
        setShowData(resp);
      } catch (err) {
        console.trace(err);
      } finally {
        setLoading(false);
      }
    }
    request();
   
  }, [key]);
  
  const handle_build = async() => {
    try {
      setLoading(true)
      await buildWebProbeSolution();
      toast.success("Solution built")
    } catch (err) {
      toast.error("Failed to build solution")
      console.trace(err);
    } finally {
      setLoading(false);
    }
  }

  const handle_run = async() => {
    try {
      await runWebProbeSolution();
      toast.success("Running defined test cases")
    } catch (err) {
      toast.error("Failed to run")
      console.trace(err);
    }
  }

  useEffect(() => {
    getViewData();
  }, [getViewData]);
  return (
    <>
      <SimplePageTitle  title="Webprobe Info Table" />
      <div>
        <Button onClick={() => handle_build()}> RE-BUILD Solution </Button>
        <Button onClick={() => handle_run()}> Run monitoring </Button>
      </div>
      <ButtonGroup>
      {
        ["FOUND", "NOT FOUND",  "TIMEOUT", "ERROR","SERVER ERROR", "STEP FUNCTION SERVER ERROR" ].map((k) => 
          <Button 
            variant="contained"
            key={k}
            onClick={() => setKey(k)}
            sx={{ backgroundColor:  k === key ? "29abe2" : "#1e4d7d", color: "white"}}
          >
            {k}
          </Button>)
      }
      </ButtonGroup>
      <SimpleDataGrid
        loading={loading}
        data={showData}
        order={web_probe_order}
        id={false}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
