import React from "react";
import { styled } from "styled-components";
import { calculateDaysTogether, formatDateDot } from "../../../utils/date";
import { CoupleInfo } from "../../../types/ICoupleInfo";

interface AddScheduleHeaderProps {
  selectedDate: string;
  coupleInfo?: CoupleInfo;
}

const CoupleAndDateInfoHeader: React.FC<AddScheduleHeaderProps> = ({
  selectedDate,
  coupleInfo,
}) => {
  return (
    <AddScheduleHeaderBox>
      <DateInfo>
        <DateText>{formatDateDot(selectedDate)}</DateText>
        <DdayText>
          {coupleInfo
            ? `D+${calculateDaysTogether(coupleInfo.startedAt)}❤️`
            : "커플로 등록해주세요!"}
        </DdayText>
      </DateInfo>
    </AddScheduleHeaderBox>
  );
};

export default CoupleAndDateInfoHeader;

const AddScheduleHeaderBox = styled.div`
  width: 90%;
  height: 48px;
  display: flex;
  align-items: center;
  margin: 30px auto;
  border-radius: 20px;
  border: 1px solid var(--Gray, #585746);
  background: #fff;
  padding: 10px 37px;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
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
