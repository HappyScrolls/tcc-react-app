import React from "react";
import styled from "styled-components";

const TimeStroke = () => {
  return (
    <StrokeContainer>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {[...Array(48)].map((_, index) => (
          <line
            key={index}
            x1="0"
            y1={index * 13}
            x2="100%"
            y2={index * 13}
            stroke="#878678"
            strokeWidth={index % 2 === 0 ? "1" : "0.5"}
            strokeDasharray="4 2"
          />
        ))}
      </svg>
    </StrokeContainer>
  );
};

export default TimeStroke;

const StrokeContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: 1152px;
  pointer-events: none;
`;
