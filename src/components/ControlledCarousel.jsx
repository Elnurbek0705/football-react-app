import { useState } from "react";
import TopMatchCarousel from "./TopMatchCarousel";
import { Stack } from "@mui/material";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Stack className="main__carousel" activeIndex={index} onSelect={handleSelect}>
      <TopMatchCarousel />
    </Stack>
  );
}

export default ControlledCarousel;
