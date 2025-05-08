import React from "react";
import { ControlledCarousel, TopLeaguesAccordion } from "../components";
import { Grid } from "@mui/material";
import useCompetitionStore from "../store/useCompetitionStore";

const Home = () => {
  const { fullData } = useCompetitionStore();
  console.log(fullData?.filters);
  console.log(fullData?.competitions);
  return (
    <div style={{ padding: "15px" }}>
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 3 }}>
          <TopLeaguesAccordion />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <ControlledCarousel />
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          <TopLeaguesAccordion />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
