import { ContentCopy } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import qr from "../assets/qr.png";
import { useWeb3Auth } from "../contexts/web3AuthContext";
import { shortAddress } from "../utils/utils";
import { Flex } from "./common/flex";

export const CryptoDeposit = () => {
  const { address } = useWeb3Auth();

  return (
    <Flex y xc gap2 sx={{ width: "100%" }}>
      <Typography level="h3">Send APT to this address</Typography>
      <img src={qr} />
      <Flex x yc>
        {shortAddress(address, 6)}
        <IconButton size="sm" onClick={() => address && navigator.clipboard.writeText(address)}>
          <ContentCopy sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Flex>
    </Flex>
  );
};
