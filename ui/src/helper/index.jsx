import React from "react";
import ActionCell from "components/atoms/action_cell";
import { intervalToDuration, isValid } from "date-fns";
import MarkCell from "components/atoms/mak_cell";

export const sort_by_key = (array, key, doReverse) => {
  const sorted = array.sort((a, b) => a[key] - b[key]);

  if (doReverse) return sorted.reverse();

  return sorted;
};

export const field_maker = (field, header, fieldType) => {
  return {
    [field]: {
      field,
      header,
      fieldType,
    }
  };
};

export const web_probe_order_maker = ({
  field,
  header,
  fieldType,
}, minWidth) => {
  const base = {
    field,
    headerName: header,
    type: fieldType,
    minWidth,
  };

    if (field === "id") {
      base.renderCell = (e) => <ActionCell props={e} source="probe"/>;
    }

  return base;
};

export const maintenance_outage_order_maker = ({
  field,
  header,
  fieldType,
}, minWidth, 
  editable = true,
  ) => {
  const base = {
    field,
    headerName: header,
    type: fieldType,
    minWidth,
    editable,
    hide: false,
  };
  
  if (field == "__mark__") {
    base.editable = false;
    base.hide = true;
    base.renderCell = (e) => <MarkCell props={e} />;
  }

  return base;
};


export const check_selected = (route) => {
  return route === window.location.pathname;
};

export const select_options_maker = (data) => {
  const mapped_data = [];

  data.forEach((d) => {
    const { key, alias } = d;
    if (key) {
      mapped_data.push({
        key,
        alias: alias || key
      })
    } else {
      mapped_data.push({
        key: d,
        alias: d
      })
    }
  })

  return mapped_data;
}

export const alias_maker = (key, alias) => {
  return {
    key,
    alias: alias || key,
  }
}

export const get_duration = (start_date, end_date) => {
  if (start_date && end_date) {
    if((start_date instanceof Date && !isValid(start_date)) || (end_date instanceof Date && !isValid(end_date))) return;
    
    let startDate = typeof start_date === "string" ? new Date(start_date) : start_date;
    let endDate = typeof end_date === "string" ? new Date(end_date) : end_date;

    const duration = intervalToDuration({
      start: startDate,
      end: endDate
    });
    const { days, hours, minutes, seconds } = duration;
    let h = hours;
    const m = minutes;
    const s = seconds;
    if (days) h = h + days * 24;

    if (hours > -1) return `${h} h. ${m} min. ${s} sec.`

    return `${m} min. ${s} sec.`
  }
  return;
}



export const get_duration_value = (start_date, end_date) => {
  if (start_date && end_date) {
    let startDate = typeof start_date === "string" ? new Date(start_date) : start_date;
    let endDate = typeof end_date === "string" ? new Date(end_date) : end_date;

    const duration = intervalToDuration({
      start: startDate,
      end: endDate
    })
    const { days, hours, minutes, seconds } = duration;
    const durr = days * 24 * 3600 + hours * 3600 + minutes  * 60 + seconds;
    return durr;
  }
  return 0;
}

const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;


export const get_venn_difference = (set1, set2) => {
  const difference = [];
  set1.forEach((o, idx) =>  {
    if (idx <= set2.length && !objectsEqual(o, set2[idx])) {
      difference.push(o)
    }
  })
  return difference;
}


export const trace_order_maker = ({
  field,
  header,
  fieldType,
}, minWidth) => {
  const base = {
    field,
    headerName: header,
    type: fieldType,
    minWidth,
  };
  
  if (field === "request_id") {
    base.renderCell = (e) => <ActionCell props={e} source="trace"  />;
  }
  return base;
};