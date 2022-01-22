import { atom } from "recoil";

export const maintenance_form_state = atom({
  key: "maintenance_form",
  default: {
    "maintenance_starttime": new Date(),
    "maintenance_endtime": new Date(),
    "comments": "",
    "url_affected": [],
    "service": "YOUR_TEST_CASES",
    "probe": "WEB",
    "outage": false,
    "duration": 0,
  },
});

export const maintenance_multiple_form_state = atom({
  key: "maintenance_multiple_forms",
  default: [],
});

export const maintenance_table_state = atom({
  key: 'maintenance_table_state',
  default: [],
});
