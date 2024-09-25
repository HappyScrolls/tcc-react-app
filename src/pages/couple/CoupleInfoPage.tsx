import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../../components/layout/Layout";
import noCoupleProfileIcon from "../../images/mypage/noCoupleProfileIcon.svg";
import createCoupleInfo, {
  CreateCoupleInfoRequest,
} from "../../api/couple/coupleInfo";

const CoupleInfoPage = () => {
  const [name, setName] = useState("");
  const [nickNameA, setNickNameA] = useState("");
  const [nickNameB, setNickNameB] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [coupleImg, setCoupleImg] = useState<string | null>(null);
  console.log(coupleImg, setCoupleImg);

  // 날짜 변환
  const formatDate = (year: string, month: string, day: string): string => {
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const handleSubmit = async () => {
    const startedAt = formatDate(year, month, day);

    const coupleInfo = {
      name,
      nickNameA,
      nickNameB,
      startedAt,
      coupleImg: "ㅁㅈㅇ",
    } as CreateCoupleInfoRequest;
    try {
      await createCoupleInfo(coupleInfo);
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  return (
    <div>
      <CoupleInfoPageContainer>
        <HeaderText>커플 정보 수정</HeaderText>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="커플 명"
        />
        <TextInput
          value={nickNameA}
          onChange={(e) => setNickNameA(e.target.value)}
          placeholder="내 애칭"
        />
        <TextInput
          value={nickNameB}
          onChange={(e) => setNickNameB(e.target.value)}
          placeholder="애인 애칭"
        />
        사귄날
        <DateInputWrapper>
          <DateInput
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="생년"
          />
          <DateInput
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="월"
          />
          <DateInput
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="일"
          />
        </DateInputWrapper>
        커플 이미지
        <CoupleImgBox>
          <CoupleImgIcon src={noCoupleProfileIcon} />
        </CoupleImgBox>
        <ButtonDiv>
          <Button>
            <ButtonText>이전</ButtonText>
          </Button>
          <ButtonAction onClick={handleSubmit}>
            <ButtonActionText>수정 완료</ButtonActionText>
          </ButtonAction>
        </ButtonDiv>
      </CoupleInfoPageContainer>
    </div>
  );
};

export default CoupleInfoPage;

const CoupleInfoPageContainer = styled(Container)`
  gap: 21px;
`;
const HeaderText = styled.text`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 13px 20px;
  align-items: center;
  flex-shrink: 0;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  font-size: 13px;

  &::placeholder {
    color: #878678;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const DateInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const DateInput = styled(TextInput)`
  width: calc(100% / 3 - 5px);
`;

const CoupleImgBox = styled.div`
  width: 183px;
  height: 183px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
`;

const CoupleImgIcon = styled.img`
  width: 100px;
  height: 89.764px;
  flex-shrink: 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  width: 126px;
  padding: 12px 0px 13px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const ButtonText = styled.text`
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ButtonAction = styled.div`
  display: inline-flex;
  padding: 12px 40px 13px 41px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--Primary, #f14040);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const ButtonActionText = styled.text`
  color: #fff;
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
