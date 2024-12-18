import React from "react";
import notificationIcon from "../../../images/notification/notificationIcon.svg";
import {
  INotification,
  NotificationTypeMessages,
} from "../../../types/INotification";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { readNotification } from "../../../api/query/get/useFetchNotification";

const Notification = ({
  notificationNo,
  type,
  message,
  path,
  messagedAt,
  isRead,
}: INotification) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("알림수정요청 : ", notificationNo, " ", path, " ");
    readNotification(notificationNo).then(() => {
      if (path) {
        navigate(path, { state: { fromNotification: true } });
      }
    });
  };
  return (
    <>
      <NotificationBtn isRead={isRead} onClick={handleClick}>
        <img src={notificationIcon} alt="icon" />
        <TextBox>
          <Title>{NotificationTypeMessages[type]}</Title>
          <Description>{message}</Description>
        </TextBox>
        <TextSmall>{messagedAt}</TextSmall>
      </NotificationBtn>
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
