import { Money, SportsMma } from "@mui/icons-material";
import { Divider, Grid, Typography } from "@mui/joy";
import rouletteImg from "../assets/roulette.webp";
import { Flex } from "../components/common/flex";
import { GameCard } from "../components/gameCard";

export const HomeView = () => {
  return (
    <Flex y fullwidth gap1>
      <Flex x yc gap1>
        <Money />
        <Typography fontWeight={400} textTransform={"uppercase"} level="body-md">
          Casino games
        </Typography>
      </Flex>
      <Divider />
      <Grid container>
        <GameCard img={rouletteImg} link={"roulette"} />
      </Grid>
      <Flex x yc gap1 mt={4}>
        <SportsMma />
        <Typography fontWeight={400} textTransform={"uppercase"} level="body-md">
          Pvp games
        </Typography>
      </Flex>
      <Divider />
      <Grid container>
        <GameCard />
      </Grid>
    </Flex>
  );
};
