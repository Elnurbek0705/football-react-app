import { getAllMatches, getCompetitions, getCompetitionTopScorers } from "../services/api";
import { create } from "zustand";

const useCompetitionStore = create((set, get) => ({
  competitions: [],
  competitionsFetched: false,
  competitionsLoading: false,

  selectedCompetitionId: 2021,
  setSelectedCompetitionId: (id) => set({ selectedCompetitionId: id }),

  topMatches: [],
  topMatchesFetched: false,
  topMatchesLoading: false,

  fullData: null,

  // 🆕 Top Scorers
  topScorers: [],
  topScorersFetched: false,
  topScorersLoading: false,

  fetchTopScorers: async () => {
    const { selectedCompetitionId } = get();
    set({ topScorersLoading: true });

    try {
      const data = await getCompetitionTopScorers(selectedCompetitionId);
      set({
        topScorers: data.scorers,
        topScorersFetched: true,
      });
    } catch (err) {
      console.error("❌ Top Scorers olishda xatolik:", err);
    } finally {
      set({ topScorersLoading: false });
    }
  },

  getMatchesByCompetition: () => {
    const { topMatches, selectedCompetitionId } = get();
    return topMatches.filter((match) => match.competition.id === selectedCompetitionId);
  },

  fetchCompetitions: async () => {
    set({ competitionsLoading: true });
    try {
      const data = await getCompetitions();
      set({
        competitions: data.competitions,
        fullData: data,
        competitionsFetched: true,
      });
    } catch (err) {
      console.error("❌ API xatolik:", err);
    } finally {
      set({ competitionsLoading: false });
    }
  },

  fetchTopMatches: async () => {
    set({ topMatchesLoading: true });
    try {
      const data = await getAllMatches();
      const today = new Date().toISOString().split("T")[0];

      const topMatches = data.matches.filter(
        (match) => match.utcDate.split("T")[0] === today
      );

      set({
        topMatches,
        topMatchesFetched: true,
      });
    } catch (err) {
      console.error("❌ Top matchlarni olishda xatolik:", err);
    } finally {
      set({ topMatchesLoading: false });
    }
  },

  fetchAllInitialData: async () => {
    await Promise.all([
      get().fetchCompetitions(),
      get().fetchTopMatches(),
      get().fetchTopScorers(), // 🆕 Boshida top scorersni ham yuklab olish
    ]);
  },
}));

export default useCompetitionStore;
