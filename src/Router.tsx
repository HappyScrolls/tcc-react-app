import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import App from "./App";
import Redirect from "./pages/login/components/Redirect";
import SignUpPage from "./pages/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import MyPage from "./pages/mypage/MyPage";
import AddMySchedulePage from "./pages/schedule/AddMySchedulePage";
import AddCoupleSchedule from "./pages/schedule/AddCoupleSchedule";
import ProfileEdit from "./pages/mypage/components/ProfileEdit";
import CoupleProfileEdit from "./pages/mypage/components/CoupleProfileEdit";
import SuspenseMainPage from "./pages/main/SuspenseMainPage";
import EditSchedulePage from "./pages/schedule/EditSchedulePage";
import ModifyScheduleRequestPage from "./pages/schedule/ModifyScheduleRequestPage";
import CoupleProfileRegister from "./pages/mypage/components/CoupleProfileRegister";

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
        element: <SuspenseMainPage />,
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
        path: "/calendar/:date",
        element: <CalendarPage />,
      },
      {
        path: "calendar/:date/add",
        element: <AddMySchedulePage />,
      },
      {
        path: "calendar/:date/add/couple",
        element: <AddCoupleSchedule />,
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
        path: "/couple/register",
        element: <CoupleProfileRegister isEdit={false} />,
      },
      {
        path: "/profile/edit",
        element: <ProfileEdit />,
      },
      {
        path: "/couple/edit",
        element: <CoupleProfileEdit isEdit={true} />,
      },
      {
        path: "/edit-schedule/:scheduleNo",
        element: <EditSchedulePage />,
      },
      {
        path: "/modify-schedule/:scheduleNo",
        element: <ModifyScheduleRequestPage />,
      },
      {
        path: "/modify-request/:scheduleNo",
        element: <ModifyScheduleRequestPage />,
      },
    ],
  },
]);

export default router;
