import React from "react";
import { styled } from "styled-components";
import { calculateDaysTogether, formatDateDot } from "../../../utils/date";
import { CoupleInfo } from "../../../types/ICoupleInfo";
import { isInvalidCoupleInfo } from "../../../utils/coupleCheck";

interface CoupleAndDateInfoHeadeProps {
  selectedDate: string;
  coupleInfo?: CoupleInfo;
}

const CoupleAndDateInfoHeader: React.FC<CoupleAndDateInfoHeadeProps> = ({
  selectedDate,
  coupleInfo,
}) => {
  return (
    <AddScheduleHeaderBox>
      <DateInfo>
        <DateText>{formatDateDot(selectedDate)}</DateText>
        <DdayText>
          {!coupleInfo
            ? "커플로 등록해주세요!"
            : isInvalidCoupleInfo(coupleInfo)
              ? "커플 정보를 등록해주세요!"
              : `D+${calculateDaysTogether(coupleInfo.startedAt)}❤️`}
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
