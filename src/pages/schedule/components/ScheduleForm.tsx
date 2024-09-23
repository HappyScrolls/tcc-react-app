import React, { useEffect, useState } from "react";
import styled from "styled-components";
import phone from "../../../images/calendar/phone.svg";
import nophone from "../../../images/calendar/nophone.svg";
import FormProps from "../../../types/IFormProps";
import { getBusyBackgroundColor, getBusyColor } from "../../../utils/colors";

const ScheduleForm: React.FC<FormProps> = ({
  onSave,
  initialFormData,
  isCoupleSchedule,
}) => {
  const [formData, setFormData] = useState({
    busyLevel: "여유",
    title: "",
    location: "",
    person: "",
    gender: "혼성",
    startTime: "",
    endTime: "",
    repeat: "반복 없음",
    selectedDays: [] as string[],
    repeatEnd: "없음",
    endDate: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const daysOfWeek = ["월", "화", "수", "목", "금", "토"];

  const toggleDaySelection = (day: string) => {
    setFormData((prevData) => {
      const selectedDays = prevData.selectedDays.includes(day)
        ? prevData.selectedDays.filter((d) => d !== day)
        : [...prevData.selectedDays, day];
      return { ...prevData, selectedDays };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleRepeatEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, repeatEnd: e.target.value });
  };

  const handleBusyLevelChange = (level: string) => {
    setFormData({ ...formData, busyLevel: level });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <FormContainer>
      <ButtonContainer>
        <BusyButton
          level="여유"
          isSelected={formData.busyLevel === "여유"}
          onClick={() => handleBusyLevelChange("여유")}
        >
          <BusyTag level="여유" />
          여유
        </BusyButton>

        <BusyButton
          level="보통"
          isSelected={formData.busyLevel === "보통"}
          onClick={() => handleBusyLevelChange("보통")}
        >
          <BusyTag level="보통" />
          보통
        </BusyButton>

        <BusyButton
          level="바쁨"
          isSelected={formData.busyLevel === "바쁨"}
          onClick={() => handleBusyLevelChange("바쁨")}
        >
          <BusyTag level="바쁨" />
          바쁨
        </BusyButton>
      </ButtonContainer>
      {/* 일정 이름  */}
      <InputContainer>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="일정 이름"
        />
      </InputContainer>
      {/* 장소 */}
      <InputContainer>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="장소"
        />
      </InputContainer>
      {/* 사람 필드는 커플 일정이 아닌 경우에만 표시 */}
      {!isCoupleSchedule && (
        <InputContainer>
          <Input
            name="person"
            value={formData.person}
            onChange={handleChange}
            placeholder="사람"
          />
        </InputContainer>
      )}
      {/* 성별  */}
      <RadioGroup>
        <RadioWrapper>
          <RadioButton
            type="radio"
            name="gender"
            value="혼성"
            checked={formData.gender === "혼성"}
            onChange={handleRadioChange}
          />
          <SmallLabel> 혼성</SmallLabel>
        </RadioWrapper>
        <RadioWrapper>
          <RadioButton
            type="radio"
            name="gender"
            value="여성"
            checked={formData.gender === "여성"}
            onChange={handleRadioChange}
          />
          <SmallLabel> 여성</SmallLabel>
        </RadioWrapper>

        <RadioWrapper>
          <RadioButton
            type="radio"
            name="gender"
            value="남성"
            checked={formData.gender === "남성"}
            onChange={handleRadioChange}
          />
          <SmallLabel> 남성</SmallLabel>
        </RadioWrapper>
      </RadioGroup>
      {/* 시간  */}
      <TimeInputContainer>
        <Wrapper>
          <Label>시작</Label>
          <TimeInput
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </Wrapper>
        <Wrapper>
          <Label>끝</Label>
          <TimeInput
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </Wrapper>
      </TimeInputContainer>
      {/* 반복, 요일  */}
      <WeekWrapper>
        <RadioGroup>
          <RadioButton
            type="radio"
            name="repeat"
            value="반복 없음"
            checked={formData.repeat === "반복 없음"}
            onChange={(e) =>
              setFormData({ ...formData, repeat: e.target.value })
            }
          />
          <SmallLabel> 반복 없음</SmallLabel>
          <RadioButton
            type="radio"
            name="repeat"
            value="매주 반복"
            checked={formData.repeat === "매주 반복"}
            onChange={(e) =>
              setFormData({ ...formData, repeat: e.target.value })
            }
          />
          <SmallLabel> 매주 반복</SmallLabel>
          <RadioButton
            type="radio"
            name="repeat"
            value="매달 반복"
            checked={formData.repeat === "매달 반복"}
            onChange={(e) =>
              setFormData({ ...formData, repeat: e.target.value })
            }
          />
          <SmallLabel> 매달 반복</SmallLabel>
        </RadioGroup>

        {/* 요일 선택 */}
        <DaySelectionContainer>
          {daysOfWeek.map((day) => (
            <DayButton
              key={day}
              selected={formData.selectedDays.includes(day)}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </DayButton>
          ))}
        </DaySelectionContainer>

        <RepeatEndContainer>
          <RadioGroup>
            <RadioButton
              type="radio"
              name="repeatEnd"
              value="없음"
              checked={formData.repeatEnd === "없음"}
              onChange={handleRepeatEndChange}
            />
            없음
            <RadioButton
              type="radio"
              name="repeatEnd"
              value="1주 후"
              checked={formData.repeatEnd === "1주 후"}
              onChange={handleRepeatEndChange}
            />
            1주 후
            <RadioButton
              type="radio"
              name="repeatEnd"
              value="1달 후"
              checked={formData.repeatEnd === "1달 후"}
              onChange={handleRepeatEndChange}
            />
            1달 후
            <RadioButton
              type="radio"
              name="repeatEnd"
              value="1달 후"
              checked={formData.repeatEnd === "1달 후"}
              onChange={handleRepeatEndChange}
            />
            <DateInput
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
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
  margin: 0 auto;

  width: 90%;
  height: 605px;
  gap: 10px;

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
  padding: 14px 13px;
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
  margin: 0 auto;
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

const BusyButton = styled.button<{ level: string; isSelected: boolean }>`
  display: inline-flex;
  padding: 3px 16px 2px 12px;
  align-items: flex-start;
  gap: 6px;
  border-radius: 10px;
  background: ${({ level, isSelected }) =>
    isSelected ? getBusyBackgroundColor(level) : "#fff"};

  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const BusyTag = styled.div<{ level: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ level }) => getBusyColor(level)};
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

const DayButton = styled.button<{ selected: boolean }>`
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  width: 26px;
  border-radius: 10px;

  background: ${({ selected }) => (selected ? "#F25454" : "#fff")};
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: ${({ selected }) => (selected ? "#fff" : "#3B3634")};

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
