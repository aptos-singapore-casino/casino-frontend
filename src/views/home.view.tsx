import { Home } from "@mui/icons-material";
import { Divider, Typography } from "@mui/joy";
import { Flex } from "../components/common/flex";

export const HomeView = () => {
  return (
    <Flex y fullwidth gap1>
      <Flex x yc gap1>
        <Home />
        <Typography fontWeight={400} textTransform={"uppercase"} level="body-md">
          Home
        </Typography>
      </Flex>
      <Divider />
      <Divider />
    </Flex>
  );
};
