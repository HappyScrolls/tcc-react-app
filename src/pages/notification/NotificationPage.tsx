import React, { Suspense } from "react";
import Notification from "./components/Notification";
import NotFoundNotification from "./components/NotFoundNotification";
import { styled } from "styled-components";
import { Container } from "../../components/layout/Layout";

const NotificationPage = () => {
  // const notificationList = useFetchNotification();

  const notificationList = [
    {
      notificationNo: 1,
      title: "일정 수정 요청",
      body: "(일정 이름) 일정의 수정을 요청하셨습니다.",
      createdAt: "2024-12-04 10:00:00",
      isRead: true,
      link: "/ㅁㄴㅇㄹ",
    },
    {
      notificationNo: 2,
      title: "이모지",
      body: "(일정 이름) 일정에 이모지가 남겨졌습니다.",
      createdAt: "2024-12-03 15:00:00",
      isRead: true,
      link: "/ㅁㄴㅇㄹ",
    },
    {
      notificationNo: 3,
      title: "공통 일정",
      body: "공통 일정 (일정 이름)이 추가되었습니다.",
      createdAt: "2024-12-02 08:00:00",
      isRead: true,
      link: "/ㅁㄴㅇㄹ",
    },
    {
      notificationNo: 4,
      title: "수정 요청 완료",
      body: "00님이 (일정 이름)의 수정 요청에 반응을 보냈습니다.",
      createdAt: "2024-12-01 20:00:00",
      isRead: true,
      link: "12",
    },
  ];

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
                  title={notification.title}
                  body={notification.body}
                  createdAt={notification.createdAt}
                  isRead={notification.isRead}
                  link={notification.link}
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
                  title={notification.title}
                  body={notification.body}
                  createdAt={notification.createdAt}
                  isRead={notification.isRead}
                  link={notification.link}
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
