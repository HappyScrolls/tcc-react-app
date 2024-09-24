import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import App from "./App";
import Redirect from "./pages/login/components/Redirect";
import SchedulePage from "./pages/schedule/SchedulePage";
import SignUpPage from "./pages/signup/SignUpPage";
import MainPage from "./pages/main/MainPage";
import NotificationPage from "./pages/notification/NotificationPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import CoupleInfoPage from "./pages/couple/CoupleInfoPage";
import MyPage from "./pages/mypage/MyPage";

import AddMySchedulePage from "./pages/schedule/AddMySchedulePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/redirect",
        element: <Redirect />,
      },
      {
        path: "/schedule/detail",
        element: <SchedulePage />,
      },
      {
        path: "/calendar/:date",
        element: <CalendarPage />,
      },
      {
        path: "calendar/:date/add",
        element: <AddMySchedulePage />,
      },
      {
        path: "/notification",
        element: <NotificationPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/couple/info",
        element: <CoupleInfoPage />,
      },
    ],
  },
]);

export default router;
