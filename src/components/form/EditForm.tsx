import React, { ChangeEvent, useState } from "react";
import { EditFormProps } from "../../types/EditFormProps";
import { styled } from "styled-components";
import { Container } from "../layout/Layout";
import defaultCat from "../../images/signup/defaultCat.svg";
import { IMemberInfo } from "../../types/IMemberInfo";

// 내 정보 수정
const EditForm: React.FC<EditFormProps> = ({
  userInfo,
  onSubmit,
  onCancel,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [birthYear, setBirthYear] = useState(
    userInfo?.birthDate?.split("-")[0] || ""
  );
  const [birthMonth, setBirthMonth] = useState(
    userInfo?.birthDate?.split("-")[1] || ""
  );
  const [birthDay, setBirthDay] = useState(
    userInfo?.birthDate?.split("-")[2] || ""
  );

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const profileImage = selectedImage || userInfo?.profilePhoto || defaultCat;

  const handleSubmit = () => {
    onSubmit({
      ...userInfo,
      profilePhoto: selectedImage,
      birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
    } as IMemberInfo);
  };

  return (
    <>
      <FormContainer>
        <FormDiv>
          <Text>내 정보 수정</Text>

          <TextInput value={userInfo?.name || ""} placeholder="이름" readOnly />
          <TextInput
            value={userInfo?.mobileNo || ""}
            placeholder="전화번호"
            readOnly
          />

          <DateInputWrapper>
            <DateInput
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="생년"
            />
            <DateInput
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              placeholder="월"
            />
            <DateInput
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              placeholder="일"
            />
          </DateInputWrapper>

          <ProfileImage>
            <img src={profileImage} alt="Profile" />
            <AddProfileLabel htmlFor="profile-upload">+</AddProfileLabel>
            <AddProfileInput
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageFile}
            />
          </ProfileImage>
        </FormDiv>
        <ButtonWrapper>
          <CancelButton onClick={onCancel}>이전</CancelButton>
          <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
        </ButtonWrapper>
      </FormContainer>
    </>
  );
};

export default EditForm;

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
  margin-bottom: 33px;
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

const ProfileImage = styled.div`
  display: flex;
  position: relative;
  padding: 21px 19px;
  margin-bottom: 30px;
  border-radius: 50%;
  background: #fff;

  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);

  img {
    width: 100px;
    height: 100px;

    object-fit: cover;
    border-radius: 50%;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--Secondary, #ffcfc7);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: #3b3634;
  font-size: 25px;
  font-weight: 700;
  cursor: pointer;
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
