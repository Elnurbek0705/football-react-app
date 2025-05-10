require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors({ credentials: true, origin: true }));

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

// 🟢 Barcha matchlar
app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/matches`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Ma'lum bir musobaqadagi matchlar
app.get("/api/competitions/:code/matches", async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`${BASE_URL}/competitions/${code}/matches`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Jamoaga tegishli matchlar (SCHEDULED)
app.get("/api/teams/:id/matches", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/teams/${id}/matches?status=SCHEDULED`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Musobaqalar ro'yxati
app.get("/api/competitions", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/competitions`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔴 STANDINGS endpointdagi xatolikni tuzatildi
app.get("/api/competitions/:id/standings", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/competitions/${id}/standings`, {
      headers: { "X-Auth-Token": API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
});
