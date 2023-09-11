import { Button, Divider, Modal, ModalDialog, Typography } from "@mui/joy";
import { FC } from "react";
import { Flex } from "./flex";

interface Props {
  text: string;
  type: "yesno" | "ok";
  open: boolean;
  close: () => void;
  submit: () => void;
}

export const Dialog: FC<Props> = ({ text, type, open, close, submit }) => {
  return (
    <Modal open={open} onClose={close}>
      <ModalDialog>
        <Typography level="h2">Confirmation</Typography>
        <Divider sx={{ my: 2 }} />
        <Flex y yc sx={{ minWidth: "50vw", minHeight: "80px" }}>
          <Typography>{text}</Typography>
        </Flex>
        <Divider sx={{ my: 2 }} />
        {type === "yesno" && (
          <Flex x xc gap={4}>
            <Button color="danger" onClick={close} sx={{ minWidth: "100px" }}>
              No
            </Button>
            <Button
              onClick={() => {
                submit();
                close();
              }}
              sx={{ minWidth: "100px" }}
            >
              Yes
            </Button>
          </Flex>
        )}
      </ModalDialog>
    </Modal>
  );
};
