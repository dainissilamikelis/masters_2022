import React from "react";
import Grid  from "@mui/material/Grid"
import SimpleCard from "components/molecules/card";

import DEFINED_CARDS from "constant_variables/cards";

export const HomePage = () => {
  return (
    <React.Fragment>
    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: '2em'}}>
      {Object.values(DEFINED_CARDS)
      .map((c) => (
        <Grid key={c.title} item xs={12} sm={6} md={4} lg={4} xl={2} >
          <SimpleCard card={c} />
        </Grid>
      ))}
    </Grid>
    </React.Fragment>
    
  )
}

export default HomePage;
