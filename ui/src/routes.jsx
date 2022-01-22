import * as React from 'react';
import { Switch, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import MenuDrawer from 'components/organisms/drawer';
import NavigationBar from 'components/organisms/app_bar';

import HomePage from "components/pages/home";

import MaintenancePage from "components/pages/maintenance";
import MaintenanceTable from "components/pages/maintenance_table";

import WebProbe from 'components/pages/webprobe';
import ProbeView from 'components/pages/webprobe_view';

const hosts = [""];
const mdTheme = createTheme({
  navigationBar: {
    background: hosts.includes(window.location.hostname) ? "#1e4d7d" : "repeating-linear-gradient(-45deg, black, black 15px, #d99110 15px, #d99110 30px)"
  }
});

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
       <Switch>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
            <NavigationBar toggleDrawer={toggleDrawer} open={open} />
            <MenuDrawer toggleDrawer={toggleDrawer} open={open} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              minHeight: '100vh',
              overflow: 'off',
            }}
          >
          <Toolbar />
          <Box sx={{ marginLeft: "1em" }}>
              <Route exact path="/maintenance">
                <MaintenancePage />
              </Route>
              <Route exact path="/maintenance/table">
                <MaintenanceTable />
              </Route>
              <Route exact path="/probe">
                <WebProbe />
              </Route>
              <Route exact path="/probe/view/:id">
                <ProbeView />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
            </Box>
          </Box>
        </Box>
      </Switch>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
