import {
  getAllMatches,
  getCompetitions,
  getCompetitionTopScorers,
} from "../services/api";
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

  topScorers: [],
  topScorersFetched: false,
  topScorersLoading: false,

  fetchTopScorers: async () => {
    const { selectedCompetitionId } = get();
    set({ topScorersLoading: true });

    try {
      const data = await getCompetitionTopScorers(selectedCompetitionId);

      if (!data || !Array.isArray(data.scorers)) {
        console.error("❌ Top Scorers noto‘g‘ri format:", data);
        set({ topScorers: [], topScorersFetched: true });
        return;
      }

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
    if (!Array.isArray(topMatches)) return [];

    return topMatches.filter(
      (match) => match?.competition?.id === selectedCompetitionId
    );
  },

  fetchCompetitions: async () => {
    set({ competitionsLoading: true });
    try {
      const data = await getCompetitions();

      if (!data || !Array.isArray(data.competitions)) {
        console.error("❌ competitions noto‘g‘ri format:", data);
        set({ competitions: [], competitionsFetched: true });
        return;
      }

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

      if (!data || !Array.isArray(data.matches)) {
        console.error("❌ matches noto‘g‘ri format:", data);
        set({ topMatches: [], topMatchesFetched: true });
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      const topMatches = data.matches.filter(
        (match) => match.utcDate?.split("T")[0] === today
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
    try {
      await get().fetchCompetitions();
      await get().fetchTopMatches();
      await get().fetchTopScorers();
    } catch (err) {
      console.error("❌ Barcha ma'lumotlarni yuklashda xatolik:", err);
    }
  },
}));

export default useCompetitionStore;
