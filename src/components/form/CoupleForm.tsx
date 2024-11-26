import React, { ChangeEvent, useState } from "react";
import { CoupleInfo } from "../../types/ICoupleInfo";
import defaultCat from "../../images/signup/defaultCat.svg";
import { styled } from "styled-components";
import { Container } from "../layout/Layout";

const CoupleForm: React.FC<{
  coupleInfo?: CoupleInfo | null;
  onSubmit: (updatedCoupleInfo: CoupleInfo) => void;
  onCancel: () => void;
  isEdit: boolean;
}> = ({ coupleInfo, onSubmit, onCancel, isEdit }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [startYear, setStartYear] = useState(
    coupleInfo?.startedAt.split("-")[0] || ""
  );
  const [startMonth, setStartMonth] = useState(
    coupleInfo?.startedAt.split("-")[1] || ""
  );
  const [startDay, setStartDay] = useState(
    coupleInfo?.startedAt.split("-")[2] || ""
  );
  const [name, setName] = useState(coupleInfo?.name || "");
  const [nickNameA, setNickNameA] = useState(coupleInfo?.nickNameA || "");
  const [nickNameB, setNickNameB] = useState(coupleInfo?.nickNameB || "");

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const profileImage = selectedImage || coupleInfo?.coupleImg || defaultCat;

  const handleSubmit = () => {
    const startedAt = `${startYear}-${startMonth.padStart(2, "0")}-${startDay.padStart(2, "0")}`;
    onSubmit({
      ...coupleInfo,
      name,
      nickNameA,
      nickNameB,
      coupleImg: selectedImage,
      startedAt,
    } as CoupleInfo);
  };

  return (
    <>
      <FormContainer>
        <FormDiv>
          <Text>{isEdit ? "커플 정보 수정" : "커플 프로필 등록"}</Text>
          {/* 커플명 입력 */}
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="커플 명"
          />
          {/* 내 애칭 입력 */}
          <TextInput
            value={nickNameA}
            onChange={(e) => setNickNameA(e.target.value)}
            placeholder="내 애칭"
          />
          {/* 애인 애칭 입력 */}
          <TextInput
            value={nickNameB}
            onChange={(e) => setNickNameB(e.target.value)}
            placeholder="애인 애칭"
          />
          <Marg />
          {/* 사귄 날 입력 */}
          <Wrapper>
            <MiniText>사귄 날</MiniText>
            <DateInputWrapper>
              <DateInput
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="YYYY"
                maxLength={4}
              />
              <DateInput
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
                placeholder="MM"
                maxLength={2}
              />
              <DateInput
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
                placeholder="DD"
                maxLength={2}
              />
            </DateInputWrapper>
          </Wrapper>

          {/* 커플 이미지 입력 */}
          <Wrapper>
            <MiniText>커플 이미지</MiniText>
            <ProfileImage>
              <img src={profileImage} alt="커플 프로필" />
              <AddProfileLabel htmlFor="profile-upload">+</AddProfileLabel>
              <AddProfileInput
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageFile}
              />
            </ProfileImage>
          </Wrapper>
        </FormDiv>
        <ButtonWrapper>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
        </ButtonWrapper>
      </FormContainer>
    </>
  );
};

export default CoupleForm;

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: hidden;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  gap: 10px;
`;

const Text = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 100%;
  text-align: left;
  margin-bottom: 13px;
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
  margin-bottom: 32px;
`;

const DateInput = styled(TextInput)`
  width: calc(100% / 3 - 5px);
`;

const ProfileImage = styled.div`
  display: flex;
  position: relative;
  border-radius: 10px;
  padding: 30px;
  background: #fff;
  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);

  img {
    width: 110px;
    height: 110px;
    flex-shrink: 0;
    object-fit: cover;
  }
`;

const AddProfileLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ff6b6b;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background: var(--Secondary, #ffcfc7);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: #3b3634;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;

  margin-bottom: 5px;
  margin-right: 5px;
`;

const AddProfileInput = styled.input`
  display: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 60px;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CancelButton = styled.button`
  width: 126px;
  padding: 12px 0px 13px 0px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: var(--Black, #3b3634);
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 126px;
  padding: 12px 0px 13px 0px;
  border-radius: 10px;
  background: var(--Primary, #f14040);
  color: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const MiniText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  padding: 2px;
  margin-bottom: 7px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Marg = styled.div`
  margin-bottom: 25px;
`;
