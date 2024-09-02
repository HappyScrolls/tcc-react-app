import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/login/LoginPage";
import App from "./App";
import Redirect from "./pages/login/components/Redirect";
import SchedulePage from "./pages/schedule/SchedulePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
