import { Typography } from "@mui/joy";
import { FC } from "react";
import { Flex } from "../../components/common/flex";
import { Chip, ChipsEnum } from "./Chip";

export interface Props {
  content: string;
  color: string;
  height: string;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void;
  betAmount?: number;
}

//By ID = content unless overriden
export const RouletteTableSquare: FC<Props> = ({ content, color, height, onClick, onContextMenu, betAmount = 0 }) => {
  return (
    <Flex
      onClick={onClick}
      onContextMenu={onContextMenu}
      x
      xc
      yc
      sx={{
        "&:hover": { opacity: 0.8, transform: "translate(0%, -5%)", boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.75)" },
        transition: "0.15s",
        cursor: "pointer",
        backgroundColor: color,
        height: height,
        width: "100%",
        border: "1px solid white",
        position: "relative",
        userSelect: "none",
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: "1.1rem" }}>{content}</Typography>
      {betAmount > 0 && (
        <Chip
          size="sm"
          chipType={ChipsEnum.red}
          overrideValue={betAmount.toString()}
          sx={{ position: "absolute", height: "20px" }}
          interactable={false}
        />
      )}
    </Flex>
  );
};
