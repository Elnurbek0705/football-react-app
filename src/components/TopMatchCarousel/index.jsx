import Carousel from "react-bootstrap/Carousel";
import { Skeleton } from "@mui/material";
import useFetchTopMatches from "../../hooks/useFetchTopMatches";
import { formatMatchTime } from "../../utils/formatMatchTime";

const TopMatchCarousel = () => {
  const { topMatches, loading } = useFetchTopMatches();

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <Skeleton animation="wave" variant="text" width="80%" height={50} />
        <Skeleton animation="wave" variant="text" width="70%" height={50} />
        <Skeleton animation="wave" variant="text" width="90%" height={50} />
      </div>
    );
  }

  return (
    <Carousel interval={3000} wrap>
      {topMatches.length === 0 && (
        <Carousel.Item>
          <div style={{ padding: "30px", textAlign: "center" }}>
            <h5>Bugun uchun top matchlar mavjud emas</h5>
          </div>
        </Carousel.Item>
      )}

      {topMatches.map((match) => (
        <Carousel.Item key={match.id}>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <div className="team__emblems">
              <div className="team__emblem">
                <img src={match.homeTeam.crest} alt="team__emblem" />
              </div>
              <b>vs</b>
              <div className="team__emblem">
                <img src={match.awayTeam.crest} alt="team__emblem" />
              </div>
              <div className="team__emblem match__Time">{formatMatchTime(match.utcDate)}</div>
            </div>
            <h5>{match.competition.name}</h5>
            <h3>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </h3>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopMatchCarousel;
