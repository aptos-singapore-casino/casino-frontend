import { ContentCopy } from "@mui/icons-material";
import { Avatar, Button, Card, IconButton, Typography } from "@mui/joy";
import { FC, ReactNode } from "react";
import { useWeb3Auth } from "../../contexts/web3AuthContext";
import { useAptosTx } from "../../hooks/useAptosTx";
import { APT_PRICE } from "../../utils/constants";
import { shortAddress, toDisplayString } from "../../utils/utils";
import { Flex } from "../common/flex";
import { Poppover } from "../common/poppover";

interface Props {
  isOpen: boolean;
  close: () => void;
  setDepositModalOpen: (value: boolean) => void;
}

const KeyValue: FC<{ title: string | ReactNode; value: string | ReactNode }> = ({ title, value }) => {
  return (
    <Flex x yc gap2>
      <Typography fontWeight="bold" color="primary" level="body-sm">
        {title}
      </Typography>
      <Typography level="body-sm" color="neutral">
        {value}
      </Typography>
    </Flex>
  );
};

export const ProfileInfo: FC<Props> = ({ isOpen, close, setDepositModalOpen }) => {
  const { userInfo, address, balance, logout } = useWeb3Auth();
  const { getAirdrop } = useAptosTx();

  return (
    <Poppover isOpen={isOpen} close={close}>
      <Flex xs y sx={{ width: "430px" }}>
        <Flex x yc gap2>
          <Avatar size="lg" src={userInfo?.profileImage}></Avatar>
          <Flex y xs>
            <Typography color="primary" level="h4">
              {userInfo?.name}
            </Typography>
            <Typography level="body-sm" color="neutral">
              {userInfo?.email}
            </Typography>
          </Flex>
        </Flex>
        <Card variant="soft" sx={{ mt: 2, width: "100%" }}>
          <Flex y gap1>
            <KeyValue
              title="Wallet address"
              value={
                <Flex x yc>
                  {shortAddress(address)}
                  <IconButton size="sm" onClick={() => address && navigator.clipboard.writeText(address)}>
                    <ContentCopy sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </Flex>
              }
            />
            <KeyValue
              title="Balance"
              value={`${toDisplayString(balance || 0, 2, 8)} APT ($${toDisplayString(
                (balance || 0) * APT_PRICE,
                2,
                8
              )})`}
            />

            <Flex x xsb mt={1} gap3>
              <Button onClick={getAirdrop} fullWidth>
                Get from faucet
              </Button>
              <Button onClick={() => setDepositModalOpen(true)} fullWidth>
                Deposit
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Button sx={{ width: "100px" }} color="danger" onClick={logout}>
        Logout
      </Button>
    </Poppover>
  );
};
