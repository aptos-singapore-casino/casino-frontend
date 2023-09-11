import { Person } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Typography } from "@mui/joy";
import { useState } from "react";
import { useWeb3Auth } from "../../contexts/web3AuthContext";
import { APP_NAME, TOPBAR_HEIGHT } from "../../utils/contants";
import { Flex } from "../common/flex";
import { ProfileInfo } from "./profileInfo";

export const Topbar = () => {
  const { login, userInfo, isLoading } = useWeb3Auth();
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  return (
    <Flex
      x
      yc
      xsb
      fullwidth
      height={TOPBAR_HEIGHT}
      px={4}
      component={Card}
      borderBottom={(theme) => `2px solid ${theme.palette.divider}`}
      sx={{ position: "fixed", zIndex: 1 }}
    >
      <Typography textTransform="uppercase" level="h3" component="h1">
        {APP_NAME}
      </Typography>

      {userInfo ? (
        <Box sx={{ position: "relative" }}>
          <Button
            sx={{ minWidth: "200px" }}
            onClick={() => setIsProfileInfoOpen(true)}
            startDecorator={<Avatar size="sm" src={userInfo.profileImage} />}
          >
            {userInfo.name || userInfo.email}
          </Button>
          {<ProfileInfo isOpen={isProfileInfoOpen} close={() => setIsProfileInfoOpen(false)} />}
        </Box>
      ) : (
        <Button loading={isLoading} onClick={login} startDecorator={<Person />}>
          Login
        </Button>
      )}
    </Flex>
  );
};
