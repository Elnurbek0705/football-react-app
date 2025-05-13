import Carousel from "react-bootstrap/Carousel";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { formatMatchTime } from "../../utils/formatMatchTime";
import useSelectedCompetition from "../../hooks/useSelectedCompetition"; // ✅ yangi hook
import "./style.css";

const TopMatchCarousel = () => {
  const { matches, competition } = useSelectedCompetition(); // ✅ hookdan matches va liga ma'lumotlarini olish
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (matches.length === 0 || index >= matches.length) {
      setIndex(0);
    }
  }, [matches, index]);

  return (
    <Carousel
      style={{ wordWrap: "break-word" }}
      className="main__carousel"
      activeIndex={index}
      onSelect={handleSelect}
      interval={30000}
      wrap
    >
      {matches.length === 0 && (
        <Carousel.Item>
          <div style={{ padding: "30px", textAlign: "center" }}>
            <h5>
              Bugun{" "}
              <span>
                {competition?.name || "tanlangan liga"}
              </span>{" "}
              uchun matchlar mavjud emas
            </h5>
          </div>
        </Carousel.Item>
      )}

      {matches.map((match) => (
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
                    {match.homeTeam.shortName} vs {match.awayTeam.   }
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
                alt="League emblem"
              />
            </Grid>
          </Grid>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopMatchCarousel;
