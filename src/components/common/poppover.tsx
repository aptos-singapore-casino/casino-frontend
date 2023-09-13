import { Card } from "@mui/joy";
import { ClickAwayListener } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
}

export const Poppover: FC<Props> = ({ isOpen, close, children }) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  useEffect(() => {
    setIsOpenInternal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    close();
  };

  return (
    <ClickAwayListener onClickAway={isOpenInternal ? handleClose : () => {}}>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: (theme) => theme.palette.background.surface,
          position: "absolute",
          minHeight: "200px",
          minWidth: "300px",
          bottom: "-10px",
          right: 0,
          // transform: isOpenInternal ? "scaleY(100%)" : "scaleY(0)",
          transition: "0.3s",
          transform: `translate(0, 100%) scale(${isOpenInternal ? 1 : 0})`,
          transformOrigin: "top right",
          zIndex: 1,
        }}
      >
        {children}
      </Card>
    </ClickAwayListener>
  );
};
