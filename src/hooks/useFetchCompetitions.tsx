// hooks/useFetchCompetitions.ts
import { useEffect } from "react";
import useCompetitionStore from "../store/useCompetitionStore";

const useFetchCompetitions = () => {
  const { competitions, competitionsLoading, fetchCompetitions, competitionsFetched } = useCompetitionStore();

  useEffect(() => {
    if (!competitionsFetched) {
      fetchCompetitions();
    }
  }, [competitionsFetched]);

  return { competitions, loading: competitionsLoading };
};

export default useFetchCompetitions;
