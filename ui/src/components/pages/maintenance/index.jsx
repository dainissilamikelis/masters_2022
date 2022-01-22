/* eslint-disable no-debugger */
import React, { useState } from "react";

import { toast } from 'react-toastify';
import { useRecoilState } from "recoil";
import  Container from "@mui/material/Container";

import { maintenance_form_state, maintenance_multiple_form_state } from "components/root";
import SimplePageTitle from "components/atoms/simple_page_title";
import MaintenanceForm from "components/organisms/maintenance_form";
import postMaintenance from "api/maintenance";
import PropTypes from 'prop-types'

import { MAINTENANCE_FIELD_ENUM, PROBE_SERVICES, PROBE_SERVICES_OPTIONS } from "constant_variables/maintenance"

import SubmitButton from "components/atoms/submit_button"
import MaintenanceOverviewTable from "components/organisms/overview_table";
import { get_duration_value } from 'helper';

const MaintenanceMultiple = ({ outage = false  }) => {
  const [form, setForm] = useRecoilState(maintenance_form_state);

  const [maintenances, setMaintenances] = useRecoilState(maintenance_multiple_form_state);
  const [loading, setLoading] = useState(false);

  const disable_url  = form["probe"] !== "webprobe_kpi_mnt_conf"
  const service_options = PROBE_SERVICES_OPTIONS;
  const urls = PROBE_SERVICES[form["service"]]

  const handle_form_change = (key, value) => {
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const handle_all_change = () => {
    const urls_values = urls.map((u) => u.key);
    setForm((old) => ({
      ...old,
      [MAINTENANCE_FIELD_ENUM.url_affected]: urls_values,
    }));
  };


  const clear_form = () => {
    setForm(() => ({
      maintenance_starttime: new Date(),
      maintenance_endtime: new Date(),
      comments: "",
      url_affected: [],
      service: "",
      probe: "",
      outage,
      duration: 0,
    }))
  }

  const row_value_maker = (form) => {
    return  {  
      id: `${form.maintenance_starttime.toString()}-${form.probe}`, 
      duration: get_duration_value(form[MAINTENANCE_FIELD_ENUM.maintenance_starttime], form[MAINTENANCE_FIELD_ENUM.maintenance_endtime])
    }
  }


  const onAdd = () => {
    const duration = get_duration_value(form[MAINTENANCE_FIELD_ENUM.maintenance_starttime], form[MAINTENANCE_FIELD_ENUM.maintenance_endtime]);
    let allow_add = true;
    if (duration > 86399 ) {
      allow_add = confirm("Maintenance lasts more that one day! Press confirm to add!");
    }
    if (allow_add) {
      setMaintenances((old) => ([
        ...old,
        {...form,...row_value_maker(form)}
      ]));
      setForm((old) => ({
        ...old,
        url_affected: [],
      }))
    }
  }

  const onDelete = (index) => {
    const newMaintenances = maintenances.filter((m, i) => i !== index);
    setMaintenances(newMaintenances);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let error = false;
    try {
      await postMaintenance(maintenances);
    } catch (err) {
      console.trace(err);
      error = true;
    } finally {
      setLoading(false);
      setMaintenances([]);
      if (error) toast.error("Failed");
      else toast.success("Success");
      
      if (!error) setForm(() => ({
        maintenance_starttime: new Date(),
        maintenance_endtime: new Date(),
        comments: "",
        url_affected: [],
        service: "",
        probe: "",
        outage,
      }))
    }
  };

  return (
   <Container maxWidth="false" sx={{ maxWidth: "1920px"}}>
     <SimplePageTitle title={`Add ${outage ? "Outage" : "Maintenance"} Entries`} />
     <MaintenanceForm 
        form={form} 
        loading={loading}
        submit={onAdd}
        handleChange={handle_form_change}
        handleAllChange={handle_all_change}
        service_options={service_options}
        urls={urls}
        disable_url={disable_url}
        clearForm={clear_form}
      />
     { maintenances && maintenances.length > 0 && <>
        <MaintenanceOverviewTable loading={loading} maintenances={maintenances} handleDelete={onDelete} />  
        <SubmitButton label="Submit maintenances" onClick={onSubmit} disabled={loading || maintenances.length === 0} />
     </>}
    </Container>
  );
};

MaintenanceMultiple.propTypes = {
  outage: PropTypes.bool,
}

export default MaintenanceMultiple;
