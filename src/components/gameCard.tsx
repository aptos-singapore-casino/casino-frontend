import { Grid, Link, Typography } from "@mui/joy";
import { FC } from "react";

export const GameCard: FC<{ title?: string; img?: string; link?: string }> = ({ title, img, link }) => {
  return (
    <Grid
      mt={1}
      xs={4}
      md={2}
      lg={2}
      xl={1.5}
      href={link}
      variant="plain"
      component={Link}
      sx={{
        textDecoration: "none",
        height: "250px",
        textAlign: "center",
        display: "flex",
        border: (theme) => "1px solid " + theme.palette.neutral[500],
        justifyContent: "center",
        alignItems: "center",
        background: `center no-repeat url(${img})`,
        backgroundSize: "cover",
        borderRadius: "10px",
        transition: "0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      {!img && <Typography>Coming soon</Typography>}
    </Grid>
  );
};
