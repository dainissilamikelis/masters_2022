import { web_probe_order_maker, field_maker } from "helper";

export const web_probe_field_enum = {
    id: "id",
    result: "result",
    startTime: "startTime",
    testName: "testName"
}


export const web_probe_fields = {
    ...field_maker("id", "-", "string"),
    ...field_maker("start_time", "Start Time", "date"),
    ...field_maker("result", "Result", "string"),
    ...field_maker("url", "Url", "string"),
    ...field_maker("status", "HTTP Status", "number"),
    ...field_maker("latency", "Load time", "number"),
}

const web_probe_order = [
    web_probe_order_maker(web_probe_fields["id"], 100),
    web_probe_order_maker(web_probe_fields["start_time"], 200),
    web_probe_order_maker(web_probe_fields["result"], 200),
    web_probe_order_maker(web_probe_fields["url"], 400),
    web_probe_order_maker(web_probe_fields["status"],  200),
    web_probe_order_maker(web_probe_fields["latency"], 200),
  ]

  export default web_probe_order;




