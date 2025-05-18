import { formatDate } from "../../utils/formatDate";
import useSelectedCompetition from "../../hooks/useSelectedCompetition";

const MainTitleBar = () => {
  const { competition } = useSelectedCompetition();
  const today = formatDate(new Date());
  return (
    <div
      style={{
        color: "var(--text-color)",
        backgroundColor: "var(--navbar-bg)",
        padding: "20px",
        fontSize: "20",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>
        {competition?.name} ({competition?.area?.name})
      </h1>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0" }}>{today}</h2>
    </div>
  );
};

export default MainTitleBar;
