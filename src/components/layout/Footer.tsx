import React from "react";
import styled from "styled-components";
import heart from "../../images/layout/heart.svg";
import mypageLogo from "../../images/layout/mypageLogo.svg";
import { useNavigate } from "react-router-dom";
import { calculateDaysTogether } from "../../utils/date";
import { useFetchCoupleInfo } from "../../hooks/useCoupleInfo";

const Footer = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/mypage");
  };

  // 커플 정보
  const { data: coupleInfo } = useFetchCoupleInfo();

  return (
    <>
      <FooterContainer>
        <FooterBody>
          <FooterHeader>
            {coupleInfo ? (
              <>
                <span>{coupleInfo.nickNameA}</span>
                <LoveIcon src={heart} />
                <span>{coupleInfo.nickNameB}</span>
              </>
            ) : (
              ""
            )}
          </FooterHeader>
          <DDay>
            {coupleInfo
              ? `D+${calculateDaysTogether(coupleInfo.startedAt)}`
              : "커플로 등록해주세요!"}
          </DDay>
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
  padding: 0 0 20px 50px;

  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 20px 20px 0px 0px;
  background: #fff;
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    height: 90px;
  }
`;

const FooterBody = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  align-items: flex-start;
`;

const FooterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 25px;
  gap: 5px;

  @media (max-width: 768px) {
    padding-top: 20px;
  }

  span {
    color: var(--Black, #3b3634);
    font-family: SUIT;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const LoveIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const DDay = styled.span`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 5px;
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
