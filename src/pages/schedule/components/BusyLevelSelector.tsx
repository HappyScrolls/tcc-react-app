import React from "react";
import styled from "styled-components";
import { getBusyBackgroundColor, getBusyColor } from "../../../utils/colors";
import { BusyLevel } from "../../../types/ISchedule";

const BusyLevelSelector: React.FC<{
  busyLevel: BusyLevel;
  onChange: (level: BusyLevel) => void;
}> = ({ busyLevel, onChange }) => {
  const levels: BusyLevel[] = ["여유", "보통", "바쁨"];

  return (
    <ButtonContainer>
      {levels.map((level) => (
        <BusyButton
          key={level}
          level={level}
          isSelected={busyLevel === level}
          onClick={() => onChange(level)}
        >
          <BusyTag level={level} />
          {level}
        </BusyButton>
      ))}
    </ButtonContainer>
  );
};

export default BusyLevelSelector;

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
  cursor: pointer;
`;

const BusyTag = styled.div<{ level: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ level }) => getBusyColor(level)};
`;
