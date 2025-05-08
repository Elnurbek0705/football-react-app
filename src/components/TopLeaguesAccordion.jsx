import { useEffect, useState } from "react";
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
import useCompetitionStore from "../store/useCompetitionStore";
import { useTheme } from "../context/ThemeContex";

const TopLeaguesAccordion = () => {
  const { competitions, loading, fetched, fetchCompetitions } = useCompetitionStore();
  const { theme } = useTheme();

  useEffect(() => {
    if (!fetched) {
      fetchCompetitions();
    }
  }, [fetched, fetchCompetitions]);

  return (
    <Accordion className="accordion" defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon className="expand__icon" />}>
        <Typography sx={{ fontWeight: "bold" }}>Top Leagues</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: 0 }}>
        <List disablePadding>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ListItem
                  key={i}
                  sx={{
                    borderBottom: "1px solid #333",
                    paddingY: 1,
                    paddingX: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Skeleton variant="circular" animation="wave" width={30} height={30} />
                  </ListItemAvatar>
                  <ListItemText primary={<Skeleton width="80%" height={20} />} />
                </ListItem>
              ))
            : competitions.map((comp) => (
                <ListItem
                  key={comp.id}
                  className="accordion__item"
                  sx={{
                    borderBottom: "1px solid #333",
                    paddingY: 1,
                    paddingX: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: theme.name === "dark" ? "#1f1f1f" : '#e5e7eb',
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={comp.emblem}
                        alt="ligas logo"
                        width={30}
                        height={30}
                        style={{
                          objectFit: "contain",
                          filter: theme.name === "dark" ? "invert(1)" : 'none'
                        }}
                      />
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        {comp.name} ({comp.area.name})
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
        </List>
        {!loading && competitions.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              paddingY: 4,
              color: theme.name === "dark" ? "#bbb" : "#666",
            }}
          >
            <SentimentDissatisfiedIcon sx={{ fontSize: 48, mb: 1 }} />
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
