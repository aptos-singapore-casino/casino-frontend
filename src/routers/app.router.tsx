import { Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "../components/layout/mainLayout";
import { GameView } from "../views/game.view";
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
        { path: "/roulette", element: <GameView /> },
        { path: "/home", element: <HomeView /> },
        { path: "/view2", element: <></> },
        { path: "/view3", element: <></> },
        { path: "/theme-tester", element: <ThemeTesterView /> },
      ],
    },
  ]);
  return routes;
};
