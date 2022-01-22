import React from 'react'

import HomePage from "components/pages/home";
import Traces from "components/pages/trace";
import MaintenancePage from "components/pages/maintenance";
import MaintenanceTable from "components/pages/maintenance_table";
import UpdateKpiSla from "components/pages/update_kpi_sla";

import LogbookPage from "components/pages/logbook";
import LogbookTable from "components/pages/logbook_table";
import LogbookView from "components/pages/logbook_view";
import WebProbe from 'components/pages/webprobe';
import ProbeView from 'components/pages/webprobe_view';
import JiraImport from 'components/pages/import';

const route_maker = (path, Page,  pageAttributes) => {
    return {
        path,
        page: <Page {...pageAttributes} />
    }
}

const routes = [
    route_maker("/logbook", LogbookPage),
    route_maker("/logbook/table", LogbookTable),
    route_maker("/logbook/view/:id", LogbookView),
    route_maker("/logbook/import", JiraImport),
    route_maker("/maintenance", MaintenancePage),
    route_maker("/maintenance/table", MaintenanceTable),
    route_maker("/maintenance/kpi-sla", UpdateKpiSla ),
    route_maker("/outage", MaintenancePage, { outage: true }),
    route_maker("/outage/table", MaintenanceTable, { outage: true }),
    route_maker("/probe", WebProbe),
    route_maker("/probe/view/:PK/:SK",ProbeView),
    route_maker("/trace",Traces),
    route_maker("/",HomePage),
]

export default routes;