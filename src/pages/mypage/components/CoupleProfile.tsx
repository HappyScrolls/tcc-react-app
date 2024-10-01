import React from "react";
import styled from "styled-components";
import noCoupleProfileIcon from "../../../images/mypage/noCoupleProfileIcon.svg";
import { useNavigate } from "react-router-dom";
import { useFetchCoupleInfo } from "../../../hooks/useCoupleInfo";
import editPen from "../../../images/mypage/editPen.svg";
import coupleCat from "../../../images/emoji/이모지_커플.png";
import { IMemberInfo } from "../../../types/IMemberInfo";
import { LoverInfo } from "../../../types/ILoverInfo";
import defaultCat from "../../../images/emoji/이모지_메롱.png";
import { calculateDaysTogether, formatDateDot } from "../../../utils/date";

const CoupleProfile = ({
  memberInfo,
  loverInfo,
}: {
  memberInfo?: IMemberInfo | null;
  loverInfo?: LoverInfo | null;
}) => {
  const navigate = useNavigate();

  const handleRegistrationButton = () => {
    navigate("/couple/info");
  };

  const { data: coupleProfile } = useFetchCoupleInfo();
  const coupleProfileExists = !!coupleProfile;

  return (
    <CoupleProfileBox>
      {coupleProfileExists ? (
        <>
          {/* 커플 프로필 있는 경우 */}
          <ProfileContainer>
            <EditIcon src={editPen} alt="수정" />
            <CatIcon src={coupleCat} />

            <PinkWrapper>
              {/* 나 */}
              <Wrap>
                <CoupleImg
                  src={memberInfo?.profilePhoto ?? defaultCat}
                  alt="이미지"
                />
                <Name>애칭</Name>
              </Wrap>

              {/* 애인  */}
              <Wrap>
                <CoupleImg
                  src={loverInfo?.profilePhoto ?? defaultCat}
                  alt="이미지"
                />
                <Name>애칭</Name>
              </Wrap>

              <TextWrap>
                <Text>
                  {coupleProfile.name} 사랑한지 &nbsp;
                  {calculateDaysTogether(coupleProfile?.startedAt)}일 째
                </Text>
                <Text>{formatDateDot(coupleProfile?.startedAt)} ~</Text>
              </TextWrap>
            </PinkWrapper>
          </ProfileContainer>
        </>
      ) : (
        <>
          {/* 커플 프로필 등록 안내 */}
          <CatIcon src={noCoupleProfileIcon} />
          <CoupleProfileBodyText>
            아직 커플 프로필 등록이 되지 않았습니다.
          </CoupleProfileBodyText>
          <CoupleProfileAddButton onClick={handleRegistrationButton}>
            커플 프로필 등록하기
          </CoupleProfileAddButton>
        </>
      )}
    </CoupleProfileBox>
  );
};

export default CoupleProfile;

const CoupleProfileBox = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  border: 1px solid var(--Gray, #585746);
  background: #fff;
  box-shadow: 0px 0px 11.7px 0px rgba(0, 0, 0, 0.25);
`;

const CoupleProfileBodyText = styled.text`
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ProfileContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const EditIcon = styled.img`
  position: absolute;
  right: 0;
  width: 36px;
  height: 36px;
  padding: 7px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  object-fit: cover;

  margin-top: 15px;
  margin-right: 15px;
  cursor: pointer;
`;

const CoupleProfileAddButton = styled.button`
  display: flex;
  width: 36px;
  height: 36px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: var(--Primary, #f14040);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const CatIcon = styled.img`
  width: 120px;
  height: 110px;
  flex-shrink: 0;

  margin-top: 120px;
  margin-bottom: -8px;
`;

const PinkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  width: 100%;
  height: 232px;

  border-radius: 50px 50px 0px 0px;
  background: linear-gradient(180deg, #ffcfc7 0%, #fff 100%);
  box-shadow: 0px -3px 4.9px 0px rgba(0, 0, 0, 0.14);
`;

const CoupleImg = styled.img`
  display: flex;
  width: 72px;
  height: 72px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);

  object-fit: cover;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 12px;
`;

const Text = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding-bottom: 10px;
`;
