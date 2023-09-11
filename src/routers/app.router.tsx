import { Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layout/mainLayout";
import { HomeView } from "../views/home.view";
import { ThemeTesterView } from "../views/themeTester.view";

export const AppRouter = () => {
  const routes = useRoutes([
    {
      path: "*",
      element: <Navigate to={"/home"} />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Navigate to={"/home"} /> },
        { path: "/home", element: <HomeView /> },
        { path: "/view1", element: <></> },
        { path: "/view2", element: <></> },
        { path: "/view3", element: <></> },
        { path: "/theme-tester", element: <ThemeTesterView /> },
      ],
    },
  ]);
  return routes;
};
