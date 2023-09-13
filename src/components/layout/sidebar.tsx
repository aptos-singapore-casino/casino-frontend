import { AccountCircle, Gamepad } from "@mui/icons-material";
import { Card, List, ListItem, ListItemButton, ListItemDecorator } from "@mui/joy";
import { Link, useLocation } from "react-router-dom";
import { Chat } from "../../plugin/chat/chat";
import { SIDEBAR_WIDTH, TOPBAR_HEIGHT } from "../../utils/constants";
import { Flex } from "../common/flex";

const Items = [
  {
    name: "Home",
    icon: <AccountCircle />,
    path: "home",
  },
  {
    name: "Roulette",
    icon: <Gamepad />,
    path: "roulette",
  },
  // {
  //   name: "Item 2",
  //   icon: <AccountBalanceWallet />,
  //   path: "view2",
  // },
  // {
  //   name: "Item 3",
  //   icon: <TravelExplore />,
  //   path: "view3",
  // },
  // {
  //   name: "Theme tester",
  //   icon: <Brush />,
  //   path: "theme-tester",
  // },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Flex
      y
      width={SIDEBAR_WIDTH}
      height={`calc(100vh - ${TOPBAR_HEIGHT})`}
      component={Card}
      px={1}
      sx={{ position: "fixed", zIndex: 1 }}
    >
      <List>
        {Items.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <ListItem sx={{ my: 0.2 }} key={item.path}>
              <ListItemButton
                component={Link}
                to={item.path}
                variant={isActive ? "soft" : "plain"}
                color={"primary"}
                sx={{ color: (theme) => theme.palette.neutral[100] }}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
                {item.name}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Chat />
    </Flex>
  );
};
