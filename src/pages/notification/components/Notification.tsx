import React, { useState } from "react";
import notificationIcon from "../../../images/notification/notificationIcon.svg";
import {
  INotification,
  NotificationTypeMessages,
} from "../../../types/INotification";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { readNotification } from "../../../api/query/get/useFetchNotification";
import TwoBtnModal from "../../../components/modal/TwoBtnModal";
import modalCat from "../../../images/emoji/이모지_사랑해.png";
import {
  useAcceptScheduleModifyRequest,
  useFetchScheduleModifyRequest,
  useRejectScheduleModifyRequest,
} from "../../../hooks/useModifySchedule";

const Notification = ({
  notificationNo,
  type,
  message,
  path,
  messagedAt,
  isRead,
}: INotification) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scheduleNo = path?.split("/")[2];

  // 수정 요청 내용
  console.log(scheduleNo);
  const { data: scheduleModifyRequest } = useFetchScheduleModifyRequest(
    Number(scheduleNo)
  );

  const { mutate: acceptScheduleModifyRequest } =
    useAcceptScheduleModifyRequest();

  const { mutate: rejectScheduleModifyRequest } =
    useRejectScheduleModifyRequest();

  console.log("수정요처내용: ", scheduleModifyRequest);

  const handleAccept = () => {
    console.log("수락 처리");
    acceptScheduleModifyRequest(Number(scheduleNo));
    handleModalClose();
  };

  const handleReject = () => {
    console.log("거절 처리");
    rejectScheduleModifyRequest(Number(scheduleNo));
    handleModalClose();
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    readNotification(notificationNo).then(() => {
      if (path) {
        navigate(path, { state: { fromNotification: true } });
      }
    });
  };

  const renderModalContent = () => {
    if (type === "SCHEDULE_CREATE") {
      return (
        <TwoBtnModal
          title={`${NotificationTypeMessages[type]}을 확인할까요?`}
          description={""}
          imageSrc={modalCat}
          confirmText="예"
          cancelText="아니요"
          onConfirm={() => {
            handleConfirm();
            handleModalClose();
          }}
          onCancel={handleModalClose}
        />
      );
    } else if (
      type === "SCHEDULE_MODIFY_REQUEST" ||
      type === "SCHEDULE_MODIFY_REQUEST_ACCEPTED"
    ) {
      return (
        <TwoBtnModal
          title={`${scheduleModifyRequest?.scheduleName}의 ${NotificationTypeMessages[type]}`}
          description={`${scheduleModifyRequest?.scheduleStartAt.replace(
            "T",
            " "
          )} ~ ${scheduleModifyRequest?.scheduleEndAt.replace(
            "T",
            " "
          )}으로 바꿔줘잉`}
          imageSrc={modalCat}
          confirmText="수락"
          cancelText="거절"
          onConfirm={handleAccept}
          onCancel={handleReject}
        />
      );
    }
    return null;
  };

  return (
    <>
      <NotificationBtn isRead={isRead} onClick={handleModalOpen}>
        <img src={notificationIcon} alt="icon" />
        <TextBox>
          <Title>{NotificationTypeMessages[type]}</Title>
          <Description>{message}</Description>
        </TextBox>
        <TextSmall>{messagedAt.replace("T", " ")}</TextSmall>{" "}
      </NotificationBtn>

      {isModalOpen && renderModalContent()}
    </>
  );
};

export default Notification;

export const Btn = styled.button`
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  align-items: stretch;

  width: 100%;
  height: 70px;
  padding: 10px;

  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);

  img {
    width: 24px;
    height: 24px;
    align-self: center;
  }
`;

interface NotificationBtnProps {
  isRead: boolean;
}

const NotificationBtn = styled(Btn)<NotificationBtnProps>`
  background-color: ${(props) => (props.isRead ? "#FFFFFF" : "#FFCFC7")};
  position: relative;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  margin-left: 5px;
  gap: 5px;
`;

const Title = styled.div`
  color: #3b3634;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.div`
  color: #3b3634;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const TextSmall = styled.div`
  color: #3b3634;
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
