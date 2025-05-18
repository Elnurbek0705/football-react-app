import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Table from "./pages/Table";
import TopScorers from "./pages/TopScorers";
// import { SpeedInsights } from "@vercel/speed-insights/react";
import Layout from "./layout";

const App = () => {
  return (
    <>
      {/* <SpeedInsights /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="table" element={<Table />} />
          <Route path="top-scorers" element={<TopScorers />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
