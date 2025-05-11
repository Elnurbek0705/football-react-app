import useCompetitionStore from "../store/useCompetitionStore";

const useFilteredMatches = () => {
  const { selectedCompetitionId, topMatches, topMatchesLoading } = useCompetitionStore();

  const filteredMatches = topMatches.filter(
    (match) => match.competition.id === selectedCompetitionId
  );

  return {
    matches: filteredMatches,
    loading: topMatchesLoading,
  };
};

export default useFilteredMatches;
