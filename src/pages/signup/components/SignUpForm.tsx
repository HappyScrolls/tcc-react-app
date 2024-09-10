import React, { ChangeEvent, useState } from "react";
import { Container } from "../../../components/layout/Layout";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
import { useNavigate } from "react-router-dom";
import { useMemberInfo } from "../../../hooks/useMemberInfo";

interface SignUpFormProps {
  memberCode: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ memberCode }) => {
  const { userInfo } = useMemberInfo(memberCode);

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
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    navigate("/main");
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const profileImage = selectedImage || userInfo?.profilePhoto || defaultCat;
  console.log(userInfo);
  return (
    <>
      <FormContainer>
        <FormDiv>
          <Text>사용자 정보 입력 </Text>
          <TextInput value={userInfo?.name || ""} placeholder="이름" readOnly />
          <TextInput
            value={userInfo?.email || ""}
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
          <AgreementWrapper>
            <AgreementText>
              개인정보 수집 및 이용 동의<span>(필수)</span>
            </AgreementText>
            <AgreeBtn />
          </AgreementWrapper>
        </FormDiv>
        <ButtonWrapper>
          <CancelButton onClick={handleCancel}>이전</CancelButton>
          <SubmitButton onClick={handleSubmit}>회원가입 완료</SubmitButton>
        </ButtonWrapper>
      </FormContainer>
    </>
  );
};

export default SignUpForm;

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-top: 100px;
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

  border-radius: 100px;
  background: #fff;

  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
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

const AgreementText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  :nth-child(1) {
    color: var(--Black, #3b3634);
    font-family: SUIT;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const AgreementWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const AgreeBtn = styled.div`
  width: 15px;
  height: 15px;
  background-color: var(--Primary, #f14040);
  border-radius: 50%;
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
