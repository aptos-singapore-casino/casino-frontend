import { Box } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { SIDEBAR_WIDTH, TOPBAR_HEIGHT } from "../../utils/contants";
import { Flex } from "../common/flex";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export const MainLayout = () => {
  // base layout with a sidebar on the left and a main content on the right
  return (
    <Flex y>
      <Topbar />
      <Flex x ys mt={TOPBAR_HEIGHT} height={`calc(100vh - ${TOPBAR_HEIGHT})`}>
        <Sidebar />
        <Box sx={{ p: 4, ml: SIDEBAR_WIDTH }} width={`calc(100vw - ${SIDEBAR_WIDTH})`}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
