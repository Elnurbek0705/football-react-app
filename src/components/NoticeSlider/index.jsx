import React from "react";
import "./NoticeSlider.css";

const NoticeSlider = ({ message }) => {
  return (
    <div className="notice-container">
      <div className="notice-marquee">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default NoticeSlider;
