import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// 🟢 Barcha matchlar
export const getAllMatches = async () => {
  const res = await axios.get(`${BASE_URL}/matches`);
  return res.data;
};

// 🟢 Musobaqa kodiga qarab matchlar
export const getCompetitionMatches = async (code) => {
  const res = await axios.get(`${BASE_URL}/competitions/${code}/matches`);
  return res.data;
};

// 🟢 Jamoa ID bo‘yicha faqat SCHEDULED matchlar
export const getTeamScheduledMatches = async (teamId) => {
  const res = await axios.get(`${BASE_URL}/teams/${teamId}/matches`);
  return res.data;
};

// 🟢 Musobaqalar ro‘yxati
export const getCompetitions = async () => {
  const res = await axios.get(`${BASE_URL}/competitions`);
  return res.data;
};

// 🆕 🟢 Musobaqa ID orqali turnir jadvali (standings)
export const getCompetitionStandings = async (competitionId) => {
  const res = await axios.get(`${BASE_URL}/competitions/${competitionId}/standings`);
  return res.data;
};
