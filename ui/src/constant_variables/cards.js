import webprobe from "assets/webprobe.png";
import Group from "assets/Group.png";

const DEFINED_CARDS = {
    maintenance: {
        alt: "Maintenance",
        image: Group,
        title: "Maintenance / Outage",
        description: "Maintenance / Outage report",
        route: "/maintenance",
    },
    web_probe: {
        alt: "probes",
        image: webprobe,
        title: "Probe Analysis",
        description: "Webprobe error information",
        route: "/probe",
    },
};

export default DEFINED_CARDS;
