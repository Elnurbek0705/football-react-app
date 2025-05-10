import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Box,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "../../context/ThemeContex";
import useFetchCompetitions from "../../hooks/useFetchCompetitions";

import "../style.css";

const TopLeaguesAccordion = () => {
  const { competitions, loading } = useFetchCompetitions();
  const { theme } = useTheme();

  return (
    <Accordion className="accordion" defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon className="expand__icon" />}>
        <Typography className="accordion__title">Top Leagues</Typography>
      </AccordionSummary>

      <AccordionDetails className="accordion__details">
        <List disablePadding>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ListItem key={i} className="accordion__item">
                  <ListItemAvatar>
                    <Skeleton variant="circular" animation="wave" width={30} height={30} />
                  </ListItemAvatar>
                  <ListItemText primary={<Skeleton width="80%" height={20} />} />
                </ListItem>
              ))
            : competitions.map((comp) => (
                <ListItem key={comp.id} className="accordion__item">
                  <ListItemAvatar>
                    <Box
                      className={`accordion__logo-wrapper ${theme.name === "dark" ? "dark" : ""}`}
                    >
                      <img
                        src={comp.emblem}
                        alt="league logo"
                        width={30}
                        height={30}
                        className={`accordion__logo ${theme.name === "dark" ? "invert" : ""}`}
                      />
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography className="accordion__text">
                        {comp.name} ({comp.area.name})
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
        </List>

        {!loading && competitions.length === 0 && (
          <Box className={`accordion__empty ${theme.name === "dark" ? "dark" : ""}`}>
            <SentimentDissatisfiedIcon className="accordion__empty-icon" />
            <Typography variant="body1" fontWeight={500}>
              Hozircha mavjud ligalar topilmadi 😕
            </Typography>
            <Typography variant="body2" fontSize={13}>
              Iltimos, internet aloqangizni tekshiring yoki keyinroq urinib ko‘ring. So'rovlar soni
              oshib ketgan bo'lishi mumkin.
            </Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default TopLeaguesAccordion;
