import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { styled } from "styled-components";
import { CoupleInfo } from "../../../types/ICoupleInfo";
import { calculateDaysTogether } from "../../../utils/date";

interface ViewChangeHeaderProps {
  isTimetableView: boolean;
  toggleView: () => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  formattedDate: string;
}

const ViewChangeHeader: React.FC<ViewChangeHeaderProps> = ({
  isTimetableView,
  toggleView,
  onPreviousDay,
  onNextDay,
  formattedDate,
}) => {
  const queryClient = useQueryClient();
  const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

  return (
    <>
      <ViewChangeBox>
        <Arrow onClick={onPreviousDay}>{"<"}</Arrow>
        <DateInfo>
          <DateText>{formattedDate}</DateText>
          <DdayText>
            {coupleInfo
              ? `D+${calculateDaysTogether(coupleInfo.startedAt)}❤️`
              : "커플로 등록해주세요!"}
          </DdayText>
        </DateInfo>
        <ViewToggleWrapper>
          <ViewToggleButton onClick={toggleView}>
            <RadioButton checked={isTimetableView} />
            <ViewLabel>Timetable View</ViewLabel>
          </ViewToggleButton>
          <ViewToggleButton onClick={toggleView}>
            <RadioButton checked={!isTimetableView} />
            <ViewLabel>List View</ViewLabel>
          </ViewToggleButton>
        </ViewToggleWrapper>
        <Arrow onClick={onNextDay}>{">"}</Arrow>
      </ViewChangeBox>
    </>
  );
};

export default ViewChangeHeader;

const ViewChangeBox = styled.div`
  width: 90%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  border: 1px solid var(--Gray, #585746);
  background: #fff;
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  padding: 0 10px;
  color: var(--Gray, #585746);
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const DateText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DdayText = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 650;
  line-height: normal;
`;

const ViewToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ViewToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioButton = styled.div<{ checked: boolean }>`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--Gray, #585746);
  background-color: transparent;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background-color: ${(props) => (props.checked ? "#585746" : "transparent")};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ViewLabel = styled.div`
  margin-left: 4px;
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
