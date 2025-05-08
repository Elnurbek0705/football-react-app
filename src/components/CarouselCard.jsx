import React from "react";
import PropTypes from "prop-types";

const CarouselCard = ({ match }) => {

  return (
    <div
      style={{
        height: "300px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
      }}
    >
      {match}
    </div>
  );
};

export default CarouselCard;
