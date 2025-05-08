import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/";
import Home from "./pages/Home";
import Table from "./pages/Table";
import TopPlayers from "./pages/TopPlayers";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/top-players" element={<TopPlayers />} />
      </Routes>
    </>
  );
};

export default App;
