import { Person } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Typography } from "@mui/joy";
import { useState } from "react";
import { useWeb3Auth } from "../../contexts/web3AuthContext";
import { APP_NAME, TOPBAR_HEIGHT } from "../../utils/constants";
import { Flex } from "../common/flex";
import { DepositModal } from "../depositModal";
import { ProfileInfo } from "./profileInfo";

export const Topbar = () => {
  const { login, userInfo, isLoading, refetchInfo } = useWeb3Auth();
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  return (
    <>
      {depositModalOpen && <DepositModal close={() => setDepositModalOpen(false)} />}
      <Flex
        x
        yc
        xsb
        fullwidth
        height={TOPBAR_HEIGHT}
        px={4}
        component={Card}
        borderBottom={(theme) => `2px solid ${theme.palette.divider}`}
        sx={{ position: "fixed", zIndex: 5 }}
      >
        <Typography textTransform="uppercase" level="h3" component="h1">
          {APP_NAME}
        </Typography>

        {userInfo ? (
          <Box sx={{ position: "relative" }}>
            <Button
              sx={{ minWidth: "200px" }}
              onClick={() => {
                refetchInfo();
                setIsProfileInfoOpen(true);
              }}
              startDecorator={<Avatar size="sm" src={userInfo.profileImage} />}
            >
              {userInfo.name || userInfo.email}
            </Button>
            {
              <ProfileInfo
                isOpen={isProfileInfoOpen}
                close={() => setIsProfileInfoOpen(false)}
                setDepositModalOpen={setDepositModalOpen}
              />
            }
          </Box>
        ) : (
          <Button loading={isLoading} onClick={login} startDecorator={<Person />}>
            Login
          </Button>
        )}
      </Flex>
    </>
  );
};
