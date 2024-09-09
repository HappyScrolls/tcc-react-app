import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import App from "./App";
import Redirect from "./pages/login/components/Redirect";
import SchedulePage from "./pages/schedule/SchedulePage";
import SignUpPage from "./pages/signup/SignUpPage";

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
        // path: "/login",
        // element: <LoginPage />,
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
    ],
  },
]);

export default router;
