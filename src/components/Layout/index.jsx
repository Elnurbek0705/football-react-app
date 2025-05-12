import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, LeaguesSidebar } from "../";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: 'space-between' }}>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 11fr', padding: '10px', gap: '10px' }}>
        <div style={{ width: "350px"}}>
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
