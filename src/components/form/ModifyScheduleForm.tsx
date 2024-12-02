/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { ScheduleData } from "../../types/ISchedule";
import FormProps from "../../types/IFormProps";
import phoneIcon from "../../images/calendar/phone.svg";
import noPhoneIcon from "../../images/calendar/nophone.svg";

const ModifyScheduleForm: React.FC<FormProps> = ({
  onSave,
  initialFormData,
}) => {
  const [formData, setFormData] = useState<ScheduleData>(
    initialFormData || {
      busyLevel: "여유",
      scheduleName: "",
      scheduleLocation: "",
      scheduleWith: "",
      groupGenderType: "혼성",
      scheduleStartAt: "",
      scheduleEndAt: "",
      isCommon: false,
      status: "미완료",
    }
  );

  console.log(formData);
  const [gender, setGender] = useState(formData.groupGenderType || "혼성");
  const [startTime, setStartTime] = useState(
    formData.scheduleStartAt.split("T")[1] || ""
  );
  const [endTime, setEndTime] = useState(
    formData.scheduleEndAt.split("T")[1] || ""
  );

  const handleSave = () => {
    console.log(formData);
    const updatedData = {
      ...formData,
      groupGenderType: gender,
      scheduleStartAt: `${formData.scheduleStartAt.split("T")[0]}T${startTime}`,
      scheduleEndAt: `${formData.scheduleEndAt.split("T")[0]}T${endTime}`,
    };

    console.log("수정된 데이터:", updatedData);
    onSave(updatedData);
  };

  return (
    <FormContainer>
      {/* 일정 이름 */}
      <InputContainer>
        <InfoText>{formData.scheduleName}</InfoText>
      </InputContainer>

      {/* 장소 */}
      <InputContainer>
        <InfoText>{formData.scheduleLocation}</InfoText>
      </InputContainer>

      {/* 사람 */}
      <InputContainer>
        <InfoText>{formData.scheduleWith}</InfoText>
      </InputContainer>

      {/* 성별 */}

      <RadioGroup>
        <RadioWrapper>
          <RadioButton
            type="radio"
            value="혼성"
            checked={gender === "혼성"}
            onChange={(e) =>
              setGender(e.target.value as "혼성" | "남성" | "여성")
            }
          />
          <SmallLabel>혼성</SmallLabel>
        </RadioWrapper>
        <RadioWrapper>
          <RadioButton
            type="radio"
            value="남성"
            checked={gender === "남성"}
            onChange={(e) =>
              setGender(e.target.value as "혼성" | "남성" | "여성")
            }
          />
          <SmallLabel>남성</SmallLabel>
        </RadioWrapper>

        <RadioWrapper>
          <RadioButton
            type="radio"
            value="여성"
            checked={gender === "여성"}
            onChange={(e) =>
              setGender(e.target.value as "혼성" | "남성" | "여성")
            }
          />
          <SmallLabel>여성</SmallLabel>
        </RadioWrapper>
      </RadioGroup>

      {/* 수정 전 시간 */}
      <InputContainer>
        <Label>수정 전 시간</Label>
        <TimeWrapper>
          <Wrapper>
            <Label>시작</Label>
            <TimeInput
              type="read-only"
              value={formData.scheduleStartAt.split("T")[1]}
            />
          </Wrapper>
          <Wrapper>
            <Label>끝</Label>
            <TimeInput
              type="read-only"
              value={formData.scheduleEndAt.split("T")[1]}
            />
          </Wrapper>
        </TimeWrapper>
      </InputContainer>

      {/* 수정 요청 시간 */}
      <InputContainer>
        <Label>수정 요청 시간</Label>
        <TimeWrapper>
          <Wrapper>
            <Label>시작</Label>
            <TimeInput
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Wrapper>
          <Wrapper>
            <Label>끝</Label>
            <TimeInput
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Wrapper>
        </TimeWrapper>
      </InputContainer>

      {/* 핸드폰 사용 여부 */}
      <InputContainer>
        <IconWrapper>
          <PhoneIcon src={phoneIcon} alt="핸드폰 사용 가능" />
          <PhoneIcon src={noPhoneIcon} alt="핸드폰 사용 불가능" />
        </IconWrapper>
      </InputContainer>

      <ButtonContainer>
        <CancelButton>이전</CancelButton>
        <SaveButton onClick={handleSave}>수정 요청하기</SaveButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ModifyScheduleForm;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px auto;

  width: 90%;
  gap: 30px;

  padding: 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.div`
  color: #3b3634;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const InfoText = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: var(--Black, #3b3634);

  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const RadioButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 15px;
  height: 15px;
  margin-right: 1px;

  border: 3px solid #3b3634;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  color: var(--Black, #3b3634);

  text-align: center;
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:checked {
    width: 13px;
    height: 13px;
    background-color: #3b3634;
    border-color: #fff;
    box-shadow: 0 0 0 3px #3b3634;
  }
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallLabel = styled.label`
  color: #3b3634;
  font-size: 10px;
  margin-left: 5px;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 45px;
`;

const TimeInput = styled.input`
  width: 120px;
  justify-content: center;
  align-items: center;

  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  padding: 15px 13px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin-top: 10px;
`;

const PhoneIcon = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 6.667px 8.333px 8.333px 6.667px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 166.667px;
  background: #fff;

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 20px;
`;

const CancelButton = styled.button`
  padding: 13px 0px 12px 0px;
  width: 40%;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SaveButton = styled.button`
  padding: 13px 0px 12px 0px;
  width: 40%;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: #f25454;

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  color: #fff;

  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
