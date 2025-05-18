import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Axios instans yaratish
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    "X-Auth-Token": API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// Hamma o'yinlarni olish
export const getAllMatches = async () => {
  const res = await api.get("/matches");
  return res.data;
};

// Muayyan musobaqaga tegishli o'yinlar
export const getCompetitionMatches = async (code) => {
  const res = await api.get(`/competitions/${code}/matches`);
  return res.data;
};

// Jamoaning rejalashtirilgan o'yinlari
export const getTeamScheduledMatches = async (teamId) => {
  const res = await api.get(`/teams/${teamId}/matches`);
  return res.data;
};

// Musobaqalar ro'yxati
export const getCompetitions = async () => {
  const res = await api.get("/competitions");
  return res.data;
};

// Turnir jadvali (standing)
export const getCompetitionStandings = async (competitionId) => {
  const res = await api.get(`/competitions/${competitionId}/standings`);
  return res.data;
};

// Top to'purarlari (scorers)
export const getCompetitionTopScorers = async (competitionCode) => {
  const res = await api.get(`/competitions/${competitionCode}/scorers`);
  return res.data;
};
