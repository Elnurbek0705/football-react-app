import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import useCompetitionStore from "../store/useCompetitionStore";

const TopMatchCarousel = () => {
  const { topMatches, fetchTopMatches, fetched } = useCompetitionStore();

  useEffect(() => {
    if (!fetched) {
      fetchTopMatches();
    }
  }, [fetched]);

  return (
    <Carousel interval={3000} wrap>
      {topMatches.length === 0 && (
        <Carousel.Item>
          <div style={{ padding: "30px", textAlign: "center" }}>
            Bugun uchun top matchlar mavjud emas
          </div>
        </Carousel.Item>
      )}

      {topMatches.map((match) => (
        <Carousel.Item key={match.id}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h5>{match.competition.name}</h5>
            <h3>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </h3>
            <p>
              {new Date(match.utcDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopMatchCarousel;
