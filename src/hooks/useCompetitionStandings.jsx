import { useEffect } from "react";
import useCompetitionStore from "../store/useCompetitionStore";

const useCompetitionStandings = () => {
  const {
    standings,
    standingsFetched,
    standingsLoading,
    fetchCompetitionStandings,
    selectedCompetitionId,
  } = useCompetitionStore();

  useEffect(() => {
    if (!standingsFetched) {
      fetchCompetitionStandings(selectedCompetitionId);
    }
  }, [selectedCompetitionId, standingsFetched, fetchCompetitionStandings]);

  return { standings, standingsLoading };
};

export default useCompetitionStandings;
