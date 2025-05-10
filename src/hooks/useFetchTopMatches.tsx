import { useEffect } from "react";
import useCompetitionStore from "../store/useCompetitionStore";

const useFetchTopMatches = () => {
  const { topMatches, topMatchesLoading, fetchTopMatches, topMatchesFetched } = useCompetitionStore();

  useEffect(() => {
    if (!topMatchesFetched) {
      fetchTopMatches();
    }
  }, [topMatchesFetched]);

  return { topMatches, loading: topMatchesLoading };
};

export default useFetchTopMatches;
