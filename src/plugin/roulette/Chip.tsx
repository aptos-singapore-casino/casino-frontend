import { Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { FC } from "react";
import { Flex } from "../../components/common/flex";
import chipBlack from "./assets/chip_black.png";
import chipBlue from "./assets/chip_blue.png";
import chipGreen from "./assets/chip_green.png";
import chipRed from "./assets/chip_red.png";

export enum ChipsEnum {
  green = "green",
  red = "red",
  blue = "blue",
  black = "black",
}

export const chipVariants = {
  green: {
    value: 5,
    img: chipGreen,
  },
  red: {
    value: 1,
    img: chipRed,
  },
  blue: {
    value: 50,
    img: chipBlue,
  },
  black: {
    value: 25,
    img: chipBlack,
  },
};

interface Props {
  chipType: ChipsEnum;
  onClick?: () => void;
  sx?: SxProps;
  overrideValue?: string;
  interactable?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "34px",
  md: "50px",
  lg: "75px",
};

export const Chip: FC<Props> = ({ chipType, onClick, sx, overrideValue, size = "md", interactable = true }) => {
  return (
    <Flex
      x
      yc
      xc
      sx={{
        position: "relative",
        cursor: interactable ? "pointer" : undefined,
        "&:hover": interactable ? { opacity: 0.9 } : undefined,
        userSelect: "none",
        zIndex: 1,
        ...sx,
      }}
      onClick={onClick}
    >
      <img src={chipVariants[chipType].img} width={sizes[size]} height={sizes[size]} />
      <Typography sx={{ position: "absolute" }}>{overrideValue ?? chipVariants[chipType].value}</Typography>
    </Flex>
  );
};
