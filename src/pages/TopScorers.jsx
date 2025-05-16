import useSelectedCompetition from "../hooks/useSelectedCompetition";
import useCompetitionStore from "../store/useCompetitionStore";
import { formatSeason } from "../utils/formatSeason";
import { useEffect } from "react";
const TopScorers = () => {
  const { topScorers, fetchTopScorers, topScorersLoading, selectedCompetitionId } =
    useCompetitionStore();

  const { competition } = useSelectedCompetition();

  const seasonText = formatSeason(
    competition?.currentSeason?.startDate,
    competition?.currentSeason?.endDate
  );

  useEffect(() => {
    fetchTopScorers();
  }, [selectedCompetitionId]);

  if (topScorersLoading) return <p style={{ color: "var(--text-color)" }}>Yuklanmoqda...</p>;

  return (
    <div
      style={{
        backgroundColor: "var(--table-bg)",
        color: "var(--table-text)",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid var(--table-border)",
        transition: "all var(--transition-speed) var(--transition-type)",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          color: "var(--primary-color)",
          marginBottom: "0.5rem",
        }}
      >
        Top Scorers - {competition?.name} ({competition?.area?.name})
      </h2>
      <h4 style={{ marginBottom: "1rem", color: "var(--text-color)" }}>Season {seasonText}</h4>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {topScorers.map((player, i) => (
          <li
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "var(--table-row-even-bg)" : "var(--table-row-odd-bg)",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--table-border)",
              transition: "background-color var(--transition-speed)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--table-row-hover-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                i % 2 === 0 ? "var(--table-row-even-bg)" : "var(--table-row-odd-bg)")
            }
          >
            <strong>
              {i + 1}. {player.player.name}
            </strong>{" "}
            ({player.team.name}) – ⚽ {player.goals}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopScorers;
