import useCompetitionStore from "../store/useCompetitionStore";

const useSelectedCompetition = () => {
  const {
    selectedCompetitionId,
    competitions,
    topMatches,
    topMatchesLoading,
  } = useCompetitionStore();

  const selectedCompetition = competitions.find(
    (comp) => comp.id === selectedCompetitionId
  );

  const filteredMatches = topMatches.filter(
    (match) => match.competition.id === selectedCompetitionId
  );

  return {
    matches: filteredMatches,
    loading: topMatchesLoading,
    competition: selectedCompetition,
  };
};

export default useSelectedCompetition;
