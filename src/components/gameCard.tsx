import { Grid } from "@mui/joy";
import { FC } from "react";

export const GameCard: FC<{ img: string }> = ({ img }) => {
  return (
    <Grid
      mt={1}
      xs={4}
      md={2}
      lg={2}
      xl={1.5}
      sx={{
        height: "250px",
        background: `center no-repeat url(${img})`,
        backgroundSize: "cover",
        borderRadius: "10px",
        transition: "0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    ></Grid>
  );
};
