import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = 'http://localhost:5000/api'

export const getAllMatches = async () => {
  const res = await axios.get(`${BASE_URL}/matches`);
  return res.data;
};

export const getCompetitionMatches = async (code) => {
  const res = await axios.get(`${BASE_URL}/competitions/${code}/matches`);
  return res.data;
};

export const getTeamScheduledMatches = async (teamId) => {
  const res = await axios.get(`${BASE_URL}/teams/${teamId}/matches`);
  return res.data;
};

export const getCompetitions = async () => {
  const res = await axios.get(`${BASE_URL}/competitions`);
  return res.data;
};

export const getCompetitionStandings = async (competitionId) => {
  const res = await axios.get(`${BASE_URL}/competitions/${competitionId}/standings`);
  return res.data;
};

export const getCompetitionTopScorers = async (competitionCode) => {
  const res = await axios.get(`${BASE_URL}/competitions/${competitionCode}/scorers`);
  return res.data;
};
