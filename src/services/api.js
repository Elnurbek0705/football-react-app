import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// 1. Barcha matchlar
export const getAllMatches = async () => {
  const res = await axios.get(`${BASE_URL}/matches`);
  return res.data;
};

// 2. Musobaqa (liga) bo‘yicha matchlar
export const getCompetitionMatches = async (code) => {
  const res = await axios.get(`${BASE_URL}/competitions/${code}/matches`);
  return res.data;
};

// 3. Jamoaning kelayotgan o‘yinlari
export const getTeamScheduledMatches = async (teamId) => {
  const res = await axios.get(`${BASE_URL}/teams/${teamId}/matches`);
  return res.data;
};

export const getCompetitions = async () => {
  const res = await axios.get(`${BASE_URL}/competitions`);
  return res.data; // endi to‘g‘ridan-to‘g‘ri .competitions emas, to‘liq object
};
