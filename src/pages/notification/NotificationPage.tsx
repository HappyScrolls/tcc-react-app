import React, { Suspense } from "react";
import Notification from "./components/Notification";
import NotFoundNotification from "./components/NotFoundNotification";
import useFetchNotification from "../../api/query/get/useFetchNotification";

const NotificationPage = () => {
  const notificationList = useFetchNotification();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {notificationList.length === 0 ? (
          <NotFoundNotification />
        ) : (
          notificationList
            .filter((notification) => !notification.isRead) // isread가 false인 항목만 필터링
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

        {notificationList.length === 0 ? (
          <NotFoundNotification />
        ) : (
          notificationList
            .filter((notification) => notification.isRead) // isread가 false인 항목만 필터링
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
    </div>
  );
};

export default NotificationPage;
