import useSelectedCompetition from "./useSelectedCompetition";

const useFilteredMatches = (tab) => {
  const { matches, loading, error } = useSelectedCompetition();

  let filtered = matches;
  if (tab === "live") {
    filtered = matches.filter(m => m.status === "LIVE");
  } else if (tab === "finished") {
    filtered = matches.filter(m => m.status === "FINISHED");
  }

  return { matches: filtered, loading, error };
};

export default useFilteredMatches;
