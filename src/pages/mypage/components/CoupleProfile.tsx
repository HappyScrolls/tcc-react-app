import React from "react";
import styled from "styled-components";
import {Container} from "../../../components/layout/Layout";
import noCoupleProfileIcon from "../../../images/mypage/noCoupleProfileIcon.svg";
import addCoupleProfileButton from "../../../images/mypage/addCoupleProfileButton.svg";
import {useNavigate} from "react-router-dom";

const CoupleProfile = () => {
    const navigate = useNavigate();

    const handleButton = () => {
        navigate("/couple/info");
    };
    return (
        <>
            <CoupleProfileBox>
                <CoupleProfileCatIcon src={noCoupleProfileIcon}/>
            </CoupleProfileBox>
            <CoupleProfileBody>
                <CoupleProfileBodyText>아직 커플 프로필 등록이 되지 않았습니다.</CoupleProfileBodyText>
                <CoupleProfileAddButton>
                    <CoupleProfileAddIcon onClick={handleButton} src={addCoupleProfileButton}/>
                </CoupleProfileAddButton>
            </CoupleProfileBody>
        </>
    );
};

export default CoupleProfile;

const CoupleProfileBox = styled(Container)`
  display: inline-flex;
  padding-top: 169px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.188px;
  border-radius: 20px;
  border: 1px solid var(--Gray, #585746);
  background: #FFF;
  box-shadow: 0px 0px 11.7px 0px rgba(0, 0, 0, 0.25);
`;

const CoupleProfileCatIcon= styled.img`
    width: 100px;
    height: 73.812px;
`;

const CoupleProfileBody = styled(Container)`
  display: flex;
  width: 323px;
  height: 232px;
  padding: 45px 64px 116px 63px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 50px 50px 0px 0px;
  background: linear-gradient(180deg, #FFCFC7 0%, #FFF 100%);
  box-shadow: 0px -2px 4.9px 0px rgba(0, 0, 0, 0.25);
`;

const CoupleProfileBodyText=styled.text`
  color: var(--Black, #3B3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CoupleProfileAddButton=styled.button`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: var(--Primary, #F14040);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const CoupleProfileAddIcon=styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;