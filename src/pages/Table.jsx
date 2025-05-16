import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCompetitionStandings } from "../services/api";
import useCompetitionStore from "../store/useCompetitionStore";
import MainTitleBar from "../components/MainTitleBar";

const columns = [
  { label: "#", key: "position" },
  { label: "Team", key: "team" },
  { label: "Played", key: "playedGames" },
  { label: "Won", key: "won" },
  { label: "Draw", key: "draw" },
  { label: "Lost", key: "lost" },
  { label: "GF", key: "goalsFor" },
  { label: "GA", key: "goalsAgainst" },
  { label: "GD", key: "goalDifference" },
  { label: "Points", key: "points" },
];

const TableWrapper = styled.div`
  color: var(--text-color);
  padding: 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
  color: var(--text-color);
`;

const TableHead = styled.thead`
  background-color: var(--primary-color);
  color: white;
`;

const TableRow = styled.tr`
  border-top: 1px solid var(--border-color);
  background-color: ${({ odd }) =>
    odd ? "var(--table-row-even-bg)" : "var(--table-row-odd-bg)"};

  &:hover {
    background-color: var(--table-row-hover-bg);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
`;

const TableCell = styled.td`
  padding: 8px 16px;
  border: 1px solid var(--border-color);
`;

const TableHeaderCell = styled.th`
  padding: 8px 16px;
  border: 1px solid var(--border-color);
`;

const TeamCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const Table = () => {
  const selectedCompetitionId = useCompetitionStore((state) => state.selectedCompetitionId);
  const competitions = useCompetitionStore((state) => state.competitions);

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCompetitionId || competitions.length === 0) return;

    const fetchStandings = async () => {
      setLoading(true);
      try {
        const selectedCompetition = competitions.find(c => c.id === selectedCompetitionId);
        if (!selectedCompetition) {
          console.warn("Tanlangan musobaqa topilmadi");
          setStandings([]);
          setLoading(false);
          return;
        }

        const competitionCode = selectedCompetition.code || selectedCompetition.id.toString();

        const data = await getCompetitionStandings(competitionCode);
        setStandings(data.standings[0]?.table || []);
      } catch (error) {
        console.error("Standings fetch error:", error);
        setStandings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [selectedCompetitionId, competitions]);

  if (loading) {
    return (
      <TableWrapper>
        <h2>Loading standings...</h2>
      </TableWrapper>
    );
  }

  return (
    <TableWrapper>
      <h1 className="text-2xl font-bold mb-4">
        <MainTitleBar />
      </h1>
      <div style={{ overflowX: "auto" }}>
        <StyledTable>
          <TableHead>
            <tr>
              {columns.map((col) => (
                <TableHeaderCell key={col.key}>{col.label}</TableHeaderCell>
              ))}
            </tr>
          </TableHead>
          <tbody>
            {standings.map((teamData, index) => (
              <TableRow key={`${teamData.position}-${teamData.team.id}`} odd={index % 2 === 1}>
                {columns.map((col) => {
                  if (col.key === "team") {
                    return (
                      <TeamCell key={col.key}>
                        <img src={teamData.team.crest} alt={teamData.team.name} />
                        {teamData.team.name}
                      </TeamCell>
                    );
                  }
                  return <TableCell key={col.key}>{teamData[col.key]}</TableCell>;
                })}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </TableWrapper>
  );
};

export default Table;
