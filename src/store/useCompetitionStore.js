import { getAllMatches } from "../services/api";
import { create } from "zustand";
import { getCompetitions } from "../services/api";

const useCompetitionStore = create((set) => ({
  competitions: [],
  competitionsFetched: false,
  competitionsLoading: false,

  topMatches: [],
  topMatchesFetched: false,
  topMatchesLoading: false,

  fullData: null,

  fetchCompetitions: async () => {
    set({ competitionsLoading: true });
    try {
      const data = await getCompetitions();
      const allowedIds = [2021, 2001, 2018, 2015, 2002, 2019, 2014, 2000];
      const filtered = data.competitions.filter((comp) => allowedIds.includes(comp.id));

      set({
        competitions: filtered,
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
}));

export default useCompetitionStore;
