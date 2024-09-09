import React from "react";
import { Container } from "../../../components/layout/Layout";
import styled from "styled-components";
import defaultCat from "../../../images/signup/defaultCat.svg";
const SignUpForm = () => {
  return (
    <>
      <FormContainer>
        <FormDiv>
          <Text>사용자 정보 입력 </Text>
          <TextInput placeholder="이름" />
          <TextInput placeholder="전화번호" />
          <DateInputWrapper>
            <DateInput placeholder="생년" />
            <DateInput placeholder="월" />
            <DateInput placeholder="일" />
          </DateInputWrapper>
          <ProfileImage>
            <img src={defaultCat} alt="Profile" />
            <AddProfile>+</AddProfile>
          </ProfileImage>
          <AgreementWrapper>
            <AgreementText>
              개인정보 수집 및 이용 동의<span>(필수)</span>
            </AgreementText>
            <AgreeBtn />
          </AgreementWrapper>
        </FormDiv>
      </FormContainer>
    </>
  );
};

export default SignUpForm;

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
`;

const Text = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TextInput = styled.input`
  width: 257px;
  height: 40px;
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
  gap: 10px;
  margin-bottom: 20px;
`;

const DateInput = styled(TextInput)`
  width: 80px;
`;

const ProfileImage = styled.div`
  display: flex;
  position: relative;
  padding: 21px 19px;
  margin-bottom: 30px;

  border-radius: 100px;
  background: #fff;

  box-shadow: 0px 0px 6.8px 0px rgba(0, 0, 0, 0.25);
`;

const AddProfile = styled.div`
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

const AgreementWrapper = styled.div``;

const AgreeBtn = styled.div`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  stroke-width: 3px;
  stroke: var(--Primary, #f14040);
`;
