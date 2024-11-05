import React from "react";
import styled from "styled-components";
import strokeSvg from "../../../images/login/stroke.svg";

const BackgroundDesign = () => {
  return (
    <>
      <StrokeLine>
        <SquareContainer>
          <Sq1 />
          <Sq2 />
          <Sq3 />
          <Sq4 />
          <Sq5 />
          <Sq6 />
        </SquareContainer>
      </StrokeLine>
    </>
  );
};

export default BackgroundDesign;

const StrokeLine = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url(${strokeSvg});
  background-repeat: repeat;
  background-size: 100% 40px;
  background-position: center;
  z-index: -1;
  /* position: relative; */

  @media (min-width: 768px) {
    background-size: 100% 50px;
  }

  @media (min-width: 1024px) {
    background-size: 100% 65px;
  }
`;

const SquareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    /* padding-left: 100px;
    padding-right: 100px; */
  }
`;

const Sq1 = styled.div`
  align-self: flex-end;
  width: 197px;
  height: 206px;
  border-radius: 50px 0px 0px 50px;
  background: rgba(211, 237, 233, 0.5);
`;

const Sq2 = styled.div`
  width: 197px;
  height: 40px;
  border-radius: 0px 50px 50px 0px;
  background: rgba(255, 227, 192, 0.5);
`;

const Sq3 = styled.div`
  width: 196px;
  height: 200px;
  border-radius: 0px 50px 50px 0px;
  background: rgba(255, 207, 199, 0.5);
`;

const Sq4 = styled.div`
  align-self: flex-end;
  width: 197px;
  height: 120px;
  border-radius: 50px 0px 0px 50px;
  background: rgba(255, 207, 199, 0.5);
`;

const Sq5 = styled.div`
  align-self: flex-end;
  width: 197px;
  height: 120px;
  border-radius: 50px 0px 0px 50px;
  background: rgba(211, 237, 233, 0.5);
`;

const Sq6 = styled.div`
  width: 197px;
  height: 326px;
  border-radius: 0px 50px 50px 0px;
  background: rgba(255, 227, 192, 0.5);
`;
