import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, LeaguesSidebar, NoticeSlider } from "../components";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <NoticeSlider message="Ushbu sayt test rejimida ishlayabdi.        This site is in test mode.        Этот сайт находится в тестовом режиме." />
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 11fr",
          padding: "115px 10px 10px",
          gap: "20px",
        }}
      >
        <div style={{ width: "350px", }}>
          <LeaguesSidebar />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
