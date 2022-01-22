import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import enLocale from 'date-fns/locale/en-GB';

import { BrowserRouter as Router } from "react-router-dom";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { RecoilRoot } from "recoil";
import Routes from "./routes";

const adjusted_locale = {
  ...enLocale,
  options: {
    ...enLocale.options,
    weekStartsOn: 1
  }
}

function App() {
  return (
    <Router>
      <ToastContainer autoClose={1000} />
      <RecoilRoot>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={adjusted_locale}>
          <div className="App">
            <Routes />
          </div>
        </LocalizationProvider>
      </RecoilRoot>
    </Router>
  )
}

export default App;
