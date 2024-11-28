import React from "react";
import styled from "styled-components";

interface AddScheduleModalProps {
  onClose: () => void;
  openAddSchedule: () => void;
  openAddCoupleSchedule: () => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  onClose,
  openAddSchedule,
  openAddCoupleSchedule,
}) => {
  return (
    <Overlay onClick={onClose}>
      <BottomSheet onClick={(e) => e.stopPropagation()}>
        <SheetContent>
          <Line />
          <Button onClick={openAddSchedule}>내 일정 추가</Button>
          <CommonButton onClick={openAddCoupleSchedule}>
            공통 일정 추가
          </CommonButton>
        </SheetContent>
      </BottomSheet>
    </Overlay>
  );
};

export default AddScheduleModal;

// 스타일 정의
const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  width: 85%;
  background: #fff;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid #f25454;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  animation: slide-up 0.3s ease-out;
  height: 270px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Line = styled.div`
  width: 53px;
  height: 5px;
  margin: 0 auto;
  border-radius: 30px;
  background: var(--Secondary, #ffcfc7);
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 12px 0px 13px 0px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CommonButton = styled(Button)`
  background: var(--Secondary, #ffcfc7);
`;
