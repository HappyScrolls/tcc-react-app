import React from "react";
import styled from "styled-components";
import heart from "../../images/layout/heart.svg";
import mypageLogo from "../../images/layout/mypageLogo.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/mypage");
  };
  return (
    <>
      <FooterContainer>
        <FooterBody>
          <FooterHeader>
            <LoveIcon src={heart} />
          </FooterHeader>
          <DDay>D+100</DDay>
        </FooterBody>
        <FooterButtonDiv onClick={handleButton}>
          <FooterButton src={mypageLogo} />
        </FooterButtonDiv>
      </FooterContainer>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  padding: 0 30px;
  position: relative;
  margin-top: 20px;

  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 0 40px;
    height: 80px;
  }
`;

const FooterBody = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const FooterHeader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 30px;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const LoveIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const DDay = styled.text`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FooterButtonDiv = styled.div`
  position: absolute;
  top: -25px;
  right: 20px;
  display: flex;
  padding: 10px 10px 17px 17px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: var(--Primary, #f14040);
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const FooterButton = styled.img`
  width: 48px;
  height: 48px;
`;
