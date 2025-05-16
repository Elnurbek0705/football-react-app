import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MainTitleBar from "../MainTitleBar";
import useFilteredMatches from "../../hooks/useFilteredMatches";
import { formatMatchTime } from "../../utils/formatMatchTime";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const tabKey = value === 0 ? "all" : value === 1 ? "live" : "finished";

  const { matches, loading, error } = useFilteredMatches(tabKey);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderMatches = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading matches</p>;
    if (!matches.length) return <p>No matches found</p>;

    return matches.map((match) => (
      <div
        className="tabs"
        key={match.id}
        style={{
          padding: "12px",
          background: "var(--button-bg)",
          marginBottom: "2px",
          display: "grid",
          gridTemplateColumns: "4fr .5fr 4fr 2.5fr 1fr",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="emblem" style={{ margin: "0 10px" }}>
            <img src={match.homeTeam.crest} alt="emblem" />
          </div>
          <strong>{match.homeTeam.shortName}</strong>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span
            style={{
              width: "40px",
              height: "40px",
              lineHeight: "20px",
              backgroundColor: "var(--bg-color)",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            vs
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          {match.awayTeam.shortName}
          <div className="emblem" style={{ margin: "0 10px" }}>
            <img src={match.awayTeam.crest} alt="emblem" />
          </div>
        </div>
        <div className="emblem match__Time">{formatMatchTime(match.utcDate)}</div>
        <Link
          to="/table"
          style={{
            textDecoration: "none",
            background: "var(--primary-color)",
            borderRadius: "15px",
            marginRight: "12px",
          }}
        >
          <Button className="button_styles">Table</Button>
        </Link>
      </div>
    ));
  };

  return (
    <>
      <MainTitleBar />
      <Box
        className="tabs__header"
        sx={{ width: "100%", backgroundColor: "var(--navbar-bg)", padding: "0", marginTop: '20px' }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            TabIndicatorProps={{ style: { display: "none" } }}
            value={value}
            onChange={handleChange}
            aria-label="tabs"
          >
            <Tab
              label="All games"
              {...a11yProps(0)}
              sx={{
                backgroundColor: value === 0 ? "var(--primary-color)" : "transparent",
                color: "var(--text-color)",
                borderRadius: 1,
              }}
            />
            <Tab
              label="Live matches"
              {...a11yProps(1)}
              sx={{
                backgroundColor: value === 1 ? "var(--primary-color)" : "transparent",
                color: "var(--text-color)",
                borderRadius: 1,
                borderLeft: "1px solid var(--button-bg)",
                borderRight: "1px solid var(--button-bg)",
              }}
            />
            <Tab
              label="Finished matches"
              {...a11yProps(2)}
              sx={{
                backgroundColor: value === 2 ? "var(--primary-color)" : "transparent",
                color: "var(--text-color)",
                borderRadius: 1,
              }}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {renderMatches()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {renderMatches()}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {renderMatches()}
        </CustomTabPanel>
      </Box>
    </>
  );
}
