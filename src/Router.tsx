import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import App from "./App";
import Redirect from "./pages/login/components/Redirect";
import SchedulePage from "./pages/schedule/SchedulePage";
import SignUpPage from "./pages/signup/SignUpPage";
import MainPage from "./pages/main/MainPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import ScheduleForm from "./pages/schedule/components/ScheduleForm";

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
        path: "/form",
        element: (
          <ScheduleForm
            onSave={function (formData: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        ),
      },
    ],
  },
]);

export default router;
