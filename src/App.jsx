import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Table from "./pages/Table";
import TopPlayers from "./pages/TopPlayers";
import { Layout } from "./components";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="table" element={<Table />} />
        <Route path="top-players" element={<TopPlayers />} />
      </Route>
    </Routes>
  );
};

export default App;
