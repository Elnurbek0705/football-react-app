import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: BASE_URL || "https://api.football-data.org/v4/",
    timeout: 10000,
  headers: {
    "X-Auth-Token": API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getAllMatches = async () => {
  const res = await api.get("/matches");
  return res.data;
};

export const getCompetitionMatches = async (code) => {
  const res = await api.get(`/competitions/${code}/matches`);
  return res.data;
};

export const getTeamScheduledMatches = async (teamId) => {
  const res = await api.get(`/teams/${teamId}/matches`);
  return res.data;
};

export const getCompetitions = async () => {
  const res = await api.get("/competitions");
  return res.data;
};

export const getCompetitionStandings = async (competitionId) => {
  const res = await api.get(`/competitions/${competitionId}/standings`);
  return res.data;
};

export const getCompetitionTopScorers = async (competitionCode) => {
  const res = await api.get(`/competitions/${competitionCode}/scorers`);
  return res.data;
};
