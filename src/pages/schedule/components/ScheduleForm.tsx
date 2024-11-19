import React, {useEffect, useState } from "react";
import styled from "styled-components";
import phone from "../../../images/calendar/phone.svg";
import nophone from "../../../images/calendar/nophone.svg";
import FormProps from "../../../types/IFormProps";
import BusyLevelSelector from "./BusyLevelSelector";
import { ScheduleData } from "../../../types/ISchedule";

const ScheduleForm: React.FC<FormProps> = ({
  onSave,
  initialFormData,
  isCoupleSchedule,
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
        scheduleAt: "",
        isCommon: false,
        status: "미완료",
      }
  );

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);


  console.log("커플일정여부: ", isCoupleSchedule);
  const daysOfWeek = ["월", "화", "수", "목", "금", "토"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genderValue = e.target.value as "혼성" | "남성" | "여성";
    setFormData({ ...formData, groupGenderType: genderValue });
  };

  const currentUrl = window.location.pathname;
  const date = currentUrl.split("/")[2];

  const handleSave = () => {
    const requestBody = {
      ...formData,
      scheduleStartAt: `${date}T${formData.scheduleStartAt}`,
      scheduleEndAt: `${date}T${formData.scheduleEndAt}`,
      scheduleAt: date,
      isCommon: isCoupleSchedule ? true : false,
    };

    console.log("입력한 데이터:", requestBody);
    onSave(requestBody);
  };

  return (
    <FormContainer>
      <BusyLevelSelector
        busyLevel={formData.busyLevel}
        onChange={(level) => setFormData({ ...formData, busyLevel: level })}
      />

      {/* 일정 이름 */}
      <InputContainer>
        <Input
          name="scheduleName"
          value={formData.scheduleName}
          onChange={handleChange}
          placeholder="일정 이름"
        />
      </InputContainer>

      {/* 장소 */}
      <InputContainer>
        <Input
          name="scheduleLocation"
          value={formData.scheduleLocation}
          onChange={handleChange}
          placeholder="장소"
        />
      </InputContainer>

      {!isCoupleSchedule && (
        <>
          {/* 사람 입력 */}
          <InputContainer>
            <Input
              name="scheduleWith"
              value={formData.scheduleWith}
              onChange={handleChange}
              placeholder="사람"
            />
          </InputContainer>

          {/* 성별 선택 */}
          <RadioGroup>
            <RadioWrapper>
              <RadioButton
                type="radio"
                name="groupGenderType"
                value="혼성"
                checked={formData.groupGenderType === "혼성"}
                onChange={handleRadioChange}
              />
              <SmallLabel>혼성</SmallLabel>
            </RadioWrapper>
            <RadioWrapper>
              <RadioButton
                type="radio"
                name="groupGenderType"
                value="여성"
                checked={formData.groupGenderType === "여성"}
                onChange={handleRadioChange}
              />
              <SmallLabel>여성</SmallLabel>
            </RadioWrapper>
            <RadioWrapper>
              <RadioButton
                type="radio"
                name="groupGenderType"
                value="남성"
                checked={formData.groupGenderType === "남성"}
                onChange={handleRadioChange}
              />
              <SmallLabel>남성</SmallLabel>
            </RadioWrapper>
          </RadioGroup>
        </>
      )}

      {/* 시간  */}
      <TimeInputContainer>
        <Wrapper>
          <Label>시작</Label>
          <TimeInput
            type="time"
            name="scheduleStartAt"
            value={formData.scheduleStartAt}
            onChange={handleChange}
          />
        </Wrapper>
        <Wrapper>
          <Label>끝</Label>
          <TimeInput
            type="time"
            name="scheduleEndAt"
            value={formData.scheduleEndAt}
            onChange={handleChange}
          />
        </Wrapper>
      </TimeInputContainer>
      {/* 반복, 요일  */}
      <WeekWrapper>
        <RadioGroup>
          <RadioButton type="radio" name="repeat" value="반복 없음" />
          <SmallLabel> 반복 없음</SmallLabel>
          <RadioButton type="radio" name="repeat" value="매주 반복" />
          <SmallLabel> 매주 반복</SmallLabel>
          <RadioButton type="radio" name="repeat" value="매달 반복" />
          <SmallLabel> 매달 반복</SmallLabel>
        </RadioGroup>

        {/* 요일 선택 */}
        <DaySelectionContainer>
          {daysOfWeek.map((day) => (
            <DayButton key={day}>{day}</DayButton>
          ))}
        </DaySelectionContainer>

        <RepeatEndContainer>
          <RadioGroup>
            <RadioButton type="radio" name="repeatEnd" value="없음" />
            없음
            <RadioButton type="radio" name="repeatEnd" value="1주 후" />
            1주 후
            <RadioButton type="radio" name="repeatEnd" value="1달 후" />
            1달 후
            <RadioButton type="radio" name="repeatEnd" value="1달 후" />
            <DateInput type="date" />
          </RadioGroup>
        </RepeatEndContainer>
      </WeekWrapper>
      {!isCoupleSchedule && (
        <PhoneWrapper>
          <Phone src={phone} />
          <Phone src={nophone} />
        </PhoneWrapper>
      )}
      <ButtonContainer>
        <SaveButton onClick={handleSave}>저장하기</SaveButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default ScheduleForm;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px auto;

  width: 90%;
  gap: 10px;

  padding: 80px 10px 90px 10px;

  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  margin-left: 9px;
  margin-bottom: 4px;
  color: var(--Black, #3b3634);
  text-align: left;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SmallLabel = styled(Label)`
  margin: 0;
  font-size: 8px;
  margin-left: 5px;
`;

const Input = styled.input`
  width: 80%;
  padding: 15px 13px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: var(--Black, #3b3634);

  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TimeInputContainer = styled.div`
  display: flex;
  margin: 10px auto;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const TimeInput = styled(Input)`
  width: 120px;
  padding: 10px 10px;
  justify-content: center;
  align-items: center;

  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
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

const SaveButton = styled.button`
  padding: 13px 0px 12px 0px;
  width: 80%;

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

const WeekWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 15px;
  border-radius: 20px;
  background: var(--Secondary, #ffcfc7);
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const DaySelectionContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
`;

const DayButton = styled.button`
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  width: 26px;
  border-radius: 10px;

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const RepeatEndContainer = styled.div`
  margin-top: 20px;
`;

const DateInput = styled.input`
  padding: 5px 7px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const PhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  margin-top: 10px;
`;

const Phone = styled.img`
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
