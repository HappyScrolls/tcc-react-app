import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FormProps from "../../../types/IFormProps";
import BusyLevelSelector from "./BusyLevelSelector";
import { ScheduleData } from "../../../types/ISchedule";
import { formatDateAndTime, formatToTime } from "../../../utils/date";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastStore } from "../../../store/toastStore";

const ScheduleForm: React.FC<FormProps> = ({
  onSave,
  initialFormData,
  isCoupleSchedule,
}) => {
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const location = useLocation();
  const date = location.pathname.split("/")[2];

  const [formData, setFormData] = useState<ScheduleData>(
    initialFormData || {
      scheduleNo: 1,
      busyLevel: "여유",
      scheduleName: "",
      scheduleLocation: "",
      scheduleWith: "",
      genderType: isCoupleSchedule ? "" : "혼성",
      scheduleStartAt: `${date}T00:00:00`,
      scheduleEndAt: `${date}T00:00:00`,
      isCommon: isCoupleSchedule || false,
      status: "",
    }
  );

  useEffect(() => {
    console.log(initialFormData);
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  // const daysOfWeek = ["월", "화", "수", "목", "금", "토"];

  // 시간 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "scheduleStartAt" || name === "scheduleEndAt") {
      const currentDate =
        initialFormData?.scheduleStartAt.split("T")[0] || date;

      setFormData({
        ...formData,
        [name]: formatDateAndTime(currentDate, value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      genderType: e.target.value as "혼성" | "남성" | "여성",
    });
  };

  const handleSave = () => {
    const requiredFields = [
      "scheduleName",
      "scheduleLocation",
      ...(isCoupleSchedule ? [] : ["scheduleWith"]),
    ];

    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof ScheduleData]
    );

    if (emptyFields.length > 0) {
      showToast("error", "모든 필드를 입력해주세요.");
      return;
    }

    const requestBody = {
      ...formData,
      isCommon: isCoupleSchedule ? true : false,
    };

    onSave(requestBody);
  };

  const handleBack = () => {
    navigate(-1);
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
                checked={formData.genderType === "혼성"}
                onChange={handleRadioChange}
              />
              <SmallLabel>혼성</SmallLabel>
            </RadioWrapper>
            <RadioWrapper>
              <RadioButton
                type="radio"
                name="groupGenderType"
                value="여성"
                checked={formData.genderType === "여성"}
                onChange={handleRadioChange}
              />
              <SmallLabel>여성</SmallLabel>
            </RadioWrapper>
            <RadioWrapper>
              <RadioButton
                type="radio"
                name="groupGenderType"
                value="남성"
                checked={formData.genderType === "남성"}
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
          <InputDesign>
            <TimeInput
              type="time"
              name="scheduleStartAt"
              value={formatToTime(formData.scheduleStartAt)}
              onChange={handleChange}
            />
          </InputDesign>
        </Wrapper>
        <Wrapper>
          <Label>끝</Label>
          <InputDesign>
            <TimeInput
              type="time"
              name="scheduleEndAt"
              value={formatToTime(formData.scheduleEndAt)}
              onChange={handleChange}
            />
          </InputDesign>
        </Wrapper>
      </TimeInputContainer>
      {/* 반복, 요일  */}
      {/* <WeekWrapper> */}
      {/* <RadioGroup>
          <RadioButton type="radio" name="repeat" value="반복 없음" />
          <SmallLabel> 반복 없음</SmallLabel>
          <RadioButton type="radio" name="repeat" value="매주 반복" />
          <SmallLabel> 매주 반복</SmallLabel>
          <RadioButton type="radio" name="repeat" value="매달 반복" />
          <SmallLabel> 매달 반복</SmallLabel>
        </RadioGroup> */}

      {/* 요일 선택 */}
      {/* <DaySelectionContainer>
          {daysOfWeek.map((day) => (
            <DayButton key={day}>{day}</DayButton>
          ))}
        </DaySelectionContainer> */}

      {/* <RepeatEndContainer>
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
        </RepeatEndContainer> */}
      {/* </WeekWrapper> */}

      {/* {!isCoupleSchedule && (
        <PhoneWrapper>
          <Phone src={phone} />
          <Phone src={nophone} />
        </PhoneWrapper>
      )} */}

      <ButtonContainer>
        <CancelButton onClick={handleBack}>이전</CancelButton>
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
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 20px;
`;

const InputDesign = styled.div`
  display: inline-block;
  margin-top: 3px;
  padding: 15px 13px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
`;

const TimeInput = styled.input`
  width: 120px;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 19px;
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

const CancelButton = styled.button`
  padding: 13px 0px 12px 0px;
  width: 40%;

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  text-align: center;
  color: #3b3634;
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

// const WeekWrapper = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   padding: 15px;
//   border-radius: 20px;
//   background: var(--Secondary, #ffcfc7);
//   box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
// `;

// const DaySelectionContainer = styled.div`
//   display: flex;
//   margin-top: 10px;
//   justify-content: space-around;
// `;

// const DayButton = styled.button`
//   padding: 5px 10px;
//   justify-content: center;
//   align-items: center;
//   width: 26px;
//   border-radius: 10px;

//   box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
//   text-align: center;
//   font-family: SUIT;
//   font-size: 8px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// `;

// const RepeatEndContainer = styled.div`
//   margin-top: 20px;
// `;

// const DateInput = styled.input`
//   padding: 5px 7px;
//   border-radius: 10px;
//   box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
// `;

// const PhoneWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 12px;

//   margin-top: 10px;
// `;

// const Phone = styled.img`
//   display: flex;
//   width: 50px;
//   height: 50px;
//   padding: 6.667px 8.333px 8.333px 6.667px;
//   justify-content: center;
//   align-items: center;
//   flex-shrink: 0;

//   border-radius: 166.667px;
//   background: #fff;

//   box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
// `;
