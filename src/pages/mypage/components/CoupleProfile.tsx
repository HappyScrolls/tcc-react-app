import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFetchCoupleInfo } from "../../../hooks/useCoupleInfo";
import editPen from "../../../images/mypage/editPen.svg";
import coupleCat from "../../../images/emoji/이모지_커플.png";
import addcoupleheart from "../../../images/mypage/addcoupleheart.svg";
import soloCat from "../../../images/mypage/soloCat.svg";
import noCoupleCat from "../../../images/mypage/noCoupleProfileIcon.svg";
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
  const { data: coupleInfo } = useFetchCoupleInfo();

  const hasValidCoupleInfo =
    coupleInfo &&
    (coupleInfo.nickNameA || coupleInfo.nickNameB || coupleInfo.startedAt);
  const hasInvalidCoupleInfo = coupleInfo && !hasValidCoupleInfo;

  const handleRegistrationButton = () => {
    navigate("/couple/info");
  };

  const handleEditButton = () => {
    navigate("/couple/edit");
  };

  console.log("커플정보 -> ", coupleInfo);
  console.log("애인 정보 -> ", loverInfo);

  return (
    <CoupleProfileBox>
      <ProfileContainer>
        {hasValidCoupleInfo ? (
          <>
            {/* 커플 프로필 있는 경우 */}
            <EditIcon src={editPen} alt="수정" onClick={handleEditButton} />
            <CatIcon src={coupleCat} />

            <PinkWrapper>
              {/* 나 */}
              <Wrap>
                <CoupleImg
                  src={memberInfo?.profilePhoto ?? defaultCat}
                  alt="이미지"
                />
                <Name>{coupleInfo.nickNameA}</Name>
              </Wrap>

              {/* 애인  */}
              <Wrap>
                <CoupleImg
                  src={loverInfo?.profilePhoto ?? defaultCat}
                  alt="이미지"
                />
                <Name>{coupleInfo.nickNameB}</Name>
              </Wrap>

              <TextWrap>
                <Text>
                  {coupleInfo.name} 사랑한지 &nbsp;
                  {calculateDaysTogether(coupleInfo?.startedAt)}일 째
                </Text>
                <Text>{formatDateDot(coupleInfo?.startedAt)} ~</Text>
              </TextWrap>
            </PinkWrapper>
          </>
        ) : hasInvalidCoupleInfo ? (
          <>
            {/* 애인 정보는 있지만 커플 프로필 없음 */}
            <CatIcon src={noCoupleCat} />
            <NonePinkWrapper>
              <CoupleProfileBodyText>
                커플 프로필이 아직 등록되지 않았습니다.
              </CoupleProfileBodyText>

              <CoupleProfileAddButton onClick={handleRegistrationButton}>
                <img src={addcoupleheart} alt="+" />
              </CoupleProfileAddButton>
            </NonePinkWrapper>
          </>
        ) : (
          <>
            {/* 애인 정보도 없고, 커플 프로필도 없는 경우 */}
            <CatIcon src={soloCat} />
            <NonePinkWrapper>
              <CoupleProfileBodyText>
                아직 커플 등록이 되지 않아 <br /> 커플 프로필 설정을 할 수
                없습니다.
              </CoupleProfileBodyText>
            </NonePinkWrapper>
          </>
        )}
      </ProfileContainer>
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

const CoupleProfileBodyText = styled.div`
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
  margin-top: 20px;
  width: 36px;
  height: 36px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: var(--Primary, #f14040);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  img {
    width: 23px;
    height: 23px;
  }
`;

const CatIcon = styled.img`
  width: 120px;
  height: 110px;
  flex-shrink: 0;

  margin-top: 120px;
  /* margin-bottom: -8px; */
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

const NonePinkWrapper = styled(PinkWrapper)`
  justify-content: center;
  flex-direction: column;
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
