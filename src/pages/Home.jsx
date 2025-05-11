import React, { useEffect } from "react";
import { ControlledCarousel, Tabs, TopLeaguesAccordion, TopMatchCarousel } from "../components";
import { Grid, Skeleton } from "@mui/material";
import useCompetitionStore from "../store/useCompetitionStore";

const Home = () => {
  const {
    fetchAllInitialData,
    competitionsLoading,
    topMatchesLoading,
    competitionsFetched,
    topMatchesFetched,
  } = useCompetitionStore();

  const loading = competitionsLoading || topMatchesLoading;

  useEffect(() => {
    if (!competitionsFetched || !topMatchesFetched) {
      fetchAllInitialData();
    }
  }, [competitionsFetched, topMatchesFetched]);

  if (loading || !competitionsFetched || !topMatchesFetched) {
    return (
      <div style={{ padding: "20px" }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={200} />
      </div>
    );
  }
  return (
    <div style={{ padding: "15px", height: '100%', overflowY: 'auto' }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TopLeaguesAccordion />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopMatchCarousel />
          <Tabs />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TopLeaguesAccordion />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
