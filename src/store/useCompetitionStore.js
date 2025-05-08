import { getAllMatches } from "../services/api";
import { create } from "zustand";
import { getCompetitions } from "../services/api";

// samarali

const useCompetitionStore = create((set) => ({
  competitions: [],
  fullData: null,
  topMatches: [],
  loading: false,
  fetched: false,

  fetchCompetitions: async () => {
    set({ loading: true });
    try {
      const data = await getCompetitions();
      const allowedIds = [2021, 2001, 2018, 2015, 2002, 2019, 2014, 2000];
      const filtered = data.competitions.filter((comp) =>
        allowedIds.includes(comp.id)
      );

      set({
        competitions: filtered,
        fullData: data,
        fetched: true,
      });
    } catch (err) {
      console.error("❌ API xatolik:", err);
    } finally {
      set({ loading: false });
    }
  },

  fetchTopMatches: async () => {
    set({ loading: true });
    try {
      const data = await getAllMatches();
      const today = new Date().toISOString().split("T")[0];

      const topMatches = data.matches.filter(
        (match) => match.utcDate.split("T")[0] === today
      );

      set({ topMatches });
    } catch (err) {
      console.error("❌ Top matchlarni olishda xatolik:", err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCompetitionStore;