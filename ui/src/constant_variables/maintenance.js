import { maintenance_outage_order_maker, field_maker } from "helper";
import { alias_maker, select_options_maker } from "helper";

export const MAINTENANCE_FIELD_ENUM = {
    maintenance_starttime: "maintenance_starttime",
    maintenance_endtime: "maintenance_endtime",
    comments: "comments",
    url_affected: "url_affected",
}

const maintenance_fields = {
  ...field_maker("id", "-", "string"),
  ...field_maker(MAINTENANCE_FIELD_ENUM.maintenance_starttime, "Start Time (UTC)", "date"),
  ...field_maker(MAINTENANCE_FIELD_ENUM.maintenance_endtime, "End Time (UTC)", "date"),
  ...field_maker(MAINTENANCE_FIELD_ENUM.comments, "Comments", "string"),
  ...field_maker(MAINTENANCE_FIELD_ENUM.url_affected, "URLs Affected", "string"),
  ...field_maker("__mark__", "Mark for Delete", "string"),
}


const MAINTENANCE_ORDER = [
  maintenance_outage_order_maker(maintenance_fields[MAINTENANCE_FIELD_ENUM.maintenance_starttime], 200),
  maintenance_outage_order_maker(maintenance_fields[MAINTENANCE_FIELD_ENUM.maintenance_endtime], 200),
  maintenance_outage_order_maker(maintenance_fields[MAINTENANCE_FIELD_ENUM.comments], 400),
  maintenance_outage_order_maker(maintenance_fields[MAINTENANCE_FIELD_ENUM.url_affected], 400),
]



export const NCE_URLS = [
  alias_maker(
    "https://www.boredapi.com/api/activity/",
    "BORED-API",
  ),
  alias_maker(
    "https://www.lu.lv/",
    "LU_TEST_CASE"
  ),
  alias_maker(
    "https://estudijas.lu.lv/login/index.php",
    "LU-LOGIN"
  )
];


export const PROBE_SERVICES = {
  "YOUR_TEST_CASES":  NCE_URLS,
}


export const PROBE_SERVICES_OPTIONS = select_options_maker(Object.keys(PROBE_SERVICES));

export const PROBE_OPTIONS = [
  alias_maker("webprobe_kpi_mnt_conf", "Web"), 
]

export default MAINTENANCE_ORDER;