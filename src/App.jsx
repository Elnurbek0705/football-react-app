import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Table from "./pages/Table";
import TopScorers from "./pages/TopScorers";
import Layout from "./layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="table" element={<Table />} />
        <Route path="top-scorers" element={<TopScorers />} />
      </Route>
    </Routes>
  );
};

export default App;
