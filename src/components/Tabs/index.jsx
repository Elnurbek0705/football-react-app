import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MainTitleBar from "../MainTitleBar";
import useFilteredMatches from "../../hooks/useFilteredMatches";

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
        key={match.id}
        style={{
          padding: "12px 24px",
          background: "var(--button-bg)",
          borderRadius: "8px",
          marginBottom: "10px",
          display: "flex",
         //  justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="emblem" style={{ margin: "0 10px" }}>
          <img src={match.homeTeam.crest} alt="emblem" />
        </div>
        <strong>{match.homeTeam.shortName} vs {match.awayTeam.shortName}</strong>
        <div className="emblem" style={{ margin: "0 10px" }}>
          <img src={match.awayTeam.crest} alt="emblem" />
        </div>
      </div>
    ));
  };

  return (
    <>
      <MainTitleBar />
      <Box
        className="tabs__header"
        sx={{ width: "100%", backgroundColor: "var(--navbar-bg)", padding: "0" }}
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
