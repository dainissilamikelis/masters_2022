import AddBox from "@mui/icons-material/AddBox";
import TableChart from "@mui/icons-material/TableChart";
import Language from "@mui/icons-material/Language";

const maintenance_list = [
    {
        title: "New Maintenance",
        icon: AddBox,
        route: "/maintenance",
    },
    {
        title: "Maintenance Table",
        icon: TableChart,
        route: "/maintenance/table",
    },
];

const web_probes_list = [
    {
        title: "Web Probe",
        icon: Language,
        route: "/probe",
    },
];


const secondaryLists = [
    { name: "Maintenance", items: maintenance_list, permission_name: "maintenance" },
    { name: "Web Probes", items: web_probes_list, permission_name: "web_probe" },
];

export default secondaryLists;
