import Carousel from "react-bootstrap/Carousel";
import { Grid, Skeleton } from "@mui/material";
import useFetchTopMatches from "../../hooks/useFetchTopMatches";
import { formatMatchTime } from "../../utils/formatMatchTime";
import useCompetitionStore from "../../store/useCompetitionStore";
import useFilteredMatches from "../../hooks/useFilteredMatches";
import { useEffect, useState } from "react";
import "./style.css";

const TopMatchCarousel = () => {
  const { topMatches, loading: loadingTopMatches } = useFetchTopMatches();
  const { loading: loadingFilteredMatches } = useFilteredMatches();
  const loading = loadingTopMatches || loadingFilteredMatches;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const { selectedCompetitionId } = useCompetitionStore();

  const filteredMatches = selectedCompetitionId
    ? topMatches.filter((match) => match.competition.id === selectedCompetitionId)
    : topMatches;

  useEffect(() => {
    if (filteredMatches.length === 0) {
      setIndex(0);
    } else if (index >= filteredMatches.length) {
      setIndex(0);
    }
  }, [filteredMatches, index]);

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
    <Carousel
    style={{wordWrap: "break-word"}}
      className="main__carousel"
      activeIndex={index}
      onSelect={handleSelect}
      interval={30000}
      wrap
    >
      {filteredMatches.length === 0 && (
        <Carousel.Item>
          <div style={{ padding: "30px", textAlign: "center" }}>
            <h5>Bugun ushbu liga uchun matchlar mavjud emas</h5>
          </div>
        </Carousel.Item>
      )}

      {filteredMatches.map((match) => (
        <Carousel.Item key={match.id}>
          <Grid className="match__grid">
            <Grid container xs={12} sm={6} md={4} lg={3}>
              <div className="emblems">
                <div className="emblem">
                  <img src={match.homeTeam.crest} alt="emblem" />
                </div>
                <b>vs</b>
                <div className="emblem">
                  <img src={match.awayTeam.crest} alt="emblem" />
                </div>
                <div className="emblem match__Time">{formatMatchTime(match.utcDate)}</div>
              </div>
              <div style={{ padding: "20px" }}>
                <h4>{match.competition.name}</h4>
                <h4>
                  <b>
                    {match.homeTeam.shortName} vs {match.awayTeam.shortName}
                  </b>
                </h4>
              </div>
            </Grid>
            <Grid display={"grid"} justifyContent="center" alignItems="center">
              <img
                width={200}
                height={200}
                style={{ borderTopLeftRadius: "45%" }}
                src={match.competition.emblem}
                alt="Legue emblem"
              />
            </Grid>
          </Grid>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopMatchCarousel;
