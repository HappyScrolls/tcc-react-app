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
          <FooterButtonDiv  onClick={handleButton}>
              <FooterButton src={mypageLogo} />
          </FooterButtonDiv>
      </FooterContainer>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 393px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 20px 20px 0px 0px;
  background: #FFF;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const FooterBody = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const FooterHeader = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;

`;
const LoveIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
const DDay = styled.text`
  color: var(--Black, #3B3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;


const FooterButtonDiv = styled.div`
  display: inline-flex;
  padding: 10px 10px 17px 17px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 100px;
  background: var(--Primary, #F14040);
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const FooterButton = styled.img`
  width: 48px;
  height: 48px;
`;

