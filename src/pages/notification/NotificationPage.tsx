import React, { Suspense } from "react";
import Notification from "./components/Notification";
import NotFoundNotification from "./components/NotFoundNotification";
import { styled } from "styled-components";
import { Container } from "../../components/layout/Layout";
import { useFetchNotification } from "../../api/query/get/useFetchNotification";

const NotificationPage = () => {
  const notificationList = useFetchNotification();

  const unreadNotifications = notificationList.filter(
    (notification) => !notification.isRead
  );
  const readNotifications = notificationList.filter(
    (notification) => notification.isRead
  );

  return (
    <>
      <Wrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <Status>안 읽음</Status>
          {unreadNotifications.length === 0 ? (
            <NotFoundNotification />
          ) : (
            unreadNotifications
              .filter((notification) => !notification.isRead)
              .map((notification) => (
                <Notification
                  key={notification.notificationNo}
                  notificationNo={notification.notificationNo}
                  type={notification.type}
                  message={notification.message}
                  messagedAt={notification.messagedAt}
                  isRead={notification.isRead}
                  path={notification.path}
                />
              ))
          )}

          <Status>읽음</Status>
          {readNotifications.length === 0 ? (
            <NotFoundNotification />
          ) : (
            readNotifications
              .filter((notification) => notification.isRead)
              .map((notification) => (
                <Notification
                  key={notification.notificationNo}
                  notificationNo={notification.notificationNo}
                  type={notification.type}
                  message={notification.message}
                  messagedAt={notification.messagedAt}
                  isRead={notification.isRead}
                  path={notification.path}
                />
              ))
          )}
        </Suspense>
      </Wrapper>
    </>
  );
};

export default NotificationPage;

const Status = styled.div`
  width: 100%;
  color: #3b3634;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 38px;

  &:first-child {
    margin-top: 0;
  }
`;

const Wrapper = styled(Container)`
  margin-top: 20px;
  gap: 10px;
`;
