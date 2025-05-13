import React, { useEffect, useState } from "react";
import { getCompetitionStandings } from "../services/api";

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

const Table = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const data = await getCompetitionStandings("PL");
        setStandings(data.standings[0]?.table || []);
      } catch (error) {
        console.error("Standings fetch error:", error);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Premier League Standings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-700 text-left text-sm">
          <thead className="bg-gray-900 text-white">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="py-2 px-4">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((teamData) => (
              <tr
                key={`${teamData.position}-${teamData.team.id}`}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                {columns.map((col) => {
                  if (col.key === "team") {
                    return (
                      <td key={col.key} className="py-2 px-4 flex items-center gap-2">
                        <img
                          width={"40px"}
                          height={"40px"}
                          src={teamData.team.crest}
                          alt={teamData.team.name}
                          className="w-5 h-5"
                        />
                        {teamData.team.name}
                      </td>
                    );
                  } else {
                    return (
                      <td key={col.key} className="py-2 px-4">
                        {teamData[col.key]}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
