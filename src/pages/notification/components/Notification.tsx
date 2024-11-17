import React from "react";
import notificationIcon from "../../../images/notification/notificationIcon.svg";

import { INotification } from "../../../types/INotification";
import styled from "styled-components";

const Notification = ({ title, body, createdAt, isRead }: INotification) => {
  return (
    <div>
      <NotificationBtn isRead={isRead}>
        <img src={notificationIcon} alt="icon" />
        <TextBox>
          <TextSmall>{title}</TextSmall>
          <TextBig>{body}</TextBig>
        </TextBox>
        <TextSmall>{createdAt}</TextSmall>
      </NotificationBtn>
    </div>
  );
};

export default Notification;

export const Btn = styled.button`
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  width: 270px;
  height: 45px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 14px;
  padding-left: 15px;
`;

interface NotificationBtnProps {
  isRead: boolean;
}

export const NotificationBtn = styled(Btn)<NotificationBtnProps>`
  background-color: ${(props) => (props.isRead ? "#FFFFFF" : "#FFCFC7")};

  & > span {
    color: #000;
  }
`;

export const TextBox = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;
export const TextSmall = styled.span`
  flex: 1;
  font-family: SUIT;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
export const TextBig = styled.span`
  flex: 1;
  font-family: SUIT;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
