import React from "react";
import styled from "styled-components";
import { IDetailModalProps } from "../../../types/IDetailModalProps";
import { getBusyColor } from "../../../utils/colors";
import phone from "../../../images/calendar/phone.svg";

const ScheduleDetailModal: React.FC<IDetailModalProps> = ({
  schedule,
  onClose,
  buttons,
}) => {
  return (
    <Overlay onClick={onClose}>
      <ModalWrapper
        onClick={(e) => e.stopPropagation()}
        borderColor={getBusyColor(schedule.busyLevel)}
      >
        <ModalContent>
          <Line />
          <Wrap>
            <BusyTag backgroundColor={getBusyColor(schedule.busyLevel)} />
            <Title>{schedule.scheduleName}</Title>
          </Wrap>

          <Details>
            <Text>{schedule.scheduleLocation}</Text>

            {!schedule.isCommon && (
              <Text>
                {schedule.scheduleWith} / {schedule.genderType}
              </Text>
            )}
            <Text>
              {new Date(schedule.scheduleStartAt).toLocaleTimeString()} ~{" "}
              {new Date(schedule.scheduleEndAt).toLocaleTimeString()}
            </Text>
          </Details>

          <ButtonGroup>
            {buttons.map((button, index) => (
              <ActionButton key={index} onClick={button.onClick}>
                {button.label}
              </ActionButton>
            ))}
          </ButtonGroup>
        </ModalContent>
      </ModalWrapper>
    </Overlay>
  );
};

export default ScheduleDetailModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  z-index: 4;

  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ModalWrapper = styled.div<{ borderColor: string }>`
  position: relative;
  width: 85%;
  background: #fff;
  border-radius: 20px 20px 0 0;
  border: 1px solid ${({ borderColor }) => borderColor};
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 25px;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const BusyTag = styled.div<{ backgroundColor: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Title = styled.div`
  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 90%;
  margin-left: 12px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  margin-top: 30px;
`;

const Text = styled.div`
  color: var(--Black, #3b3634);

  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Phone = styled.img`
  width: 20.299px;
  height: 27.463px;
`;

const ActionButton = styled.button`
  display: flex;
  width: 80%;
  padding: 13px 0px 12px 0px;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  background: #fff;

  color: var(--Black, #3b3634);
  text-align: center;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:first-child {
    background: var(--Secondary, #ffcfc7);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 30px;
`;

const Line = styled.div`
  width: 53px;
  height: 5px;
  margin: 0 auto;
  border-radius: 30px;
  background: #4d3f2c;
  margin-bottom: 30px;
`;
