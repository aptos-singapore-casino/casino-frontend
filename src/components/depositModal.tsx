import { Modal, ModalDialog, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { FC } from "react";

import { CryptoDeposit } from "./cryptoDeposit";
import { FiatDeposit } from "./fiatDeposit";

interface Props {
  close: () => void;
}

export const DepositModal: FC<Props> = ({ close }) => {
  return (
    <Modal open={true} onClose={close}>
      <ModalDialog sx={{ minWidth: "400px", height: "450px" }}>
        {/* <Flex y mb={2}>
          <Typography level="h3">Deposit</Typography>
          <Divider />
        </Flex> */}
        <Tabs>
          <TabList>
            <Tab>Crypto</Tab>
            <Tab>Fiat</Tab>
          </TabList>
          <TabPanel value={0}>
            <CryptoDeposit />
          </TabPanel>
          <TabPanel value={1}>
            <FiatDeposit />
          </TabPanel>
        </Tabs>
      </ModalDialog>
    </Modal>
  );
};
