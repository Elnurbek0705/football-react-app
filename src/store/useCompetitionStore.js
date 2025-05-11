import { getAllMatches, getCompetitions } from "../services/api";
import { create } from "zustand";

const useCompetitionStore = create((set, get) => ({
  competitions: [],
  competitionsFetched: false,
  competitionsLoading: false,

  selectedCompetitionId: "",
  setSelectedCompetitionId: (id) => set({ selectedCompetitionId: id }),

  topMatches: [],
  topMatchesFetched: false,
  topMatchesLoading: false,

  fullData: null,

  // Filter today + liga bo‘yicha
  getMatchesByCompetition: (competitionId) => {
    const { topMatches } = get();
    return topMatches.filter((match) => match.competition.id === competitionId);
  },

  fetchCompetitions: async () => {
    set({ competitionsLoading: true });
    try {
      const data = await getCompetitions();

      set({
        competitions: data.competitions, // ← Barcha ligalar
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

      const topMatches = data.matches.filter((match) => match.utcDate.split("T")[0] === today);

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

  // 🆕 BARCHA MAʼLUMOTLARNI BIR YO‘LA FETCH QILISH
  fetchAllInitialData: async () => {
    await Promise.all([get().fetchCompetitions(), get().fetchTopMatches()]);
  },
}));

export default useCompetitionStore;
