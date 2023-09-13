import { Button, Card, Grid, Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { Flex } from "../../components/common/flex";
import { useWeb3Auth } from "../../contexts/web3AuthContext";
import { RouletteEventEnum, useAptosEventListener } from "../../hooks/useAptosEventsListener";
import { useAptosTx } from "../../hooks/useAptosTx";
import { usePrevious } from "../../hooks/usePrevious";
import { CASINO_ADDRESS } from "../../utils/constants";
import { rouletteData } from "../../utils/rouletteData";
import { Chip, ChipsEnum, chipVariants } from "./Chip";
import { BLACK_COLOR, RED_COLOR, SQUARE_HEIGHT } from "./RouletteConstants";
import { RouletteTableSquare } from "./RouletteTableSquare";
import { Spinner } from "./spinner/Spinner";

const row1 = new Array(12).fill(0).map((_, i) => 3 + i * 3) as number[];
const row2 = new Array(12).fill(0).map((_, i) => 2 + i * 3) as number[];
const row3 = new Array(12).fill(0).map((_, i) => 1 + i * 3) as number[];
const row4 = ["1st 12", "2nd 12", "3rd 12"];
const row5 = ["1 to 18", "Even", "Red", "Black", "Odd", "19 to 36"];
const rightRow = ["row1", "row2", "row3"];

export const Roulette = () => {
  const [selectedChip, setSelectedChip] = useState<ChipsEnum>(ChipsEnum.red);
  const [betsMap, setBetsMap] = useState<Record<string, number>>({});
  const [hasParticipated, setHasParticipated] = useState<boolean>(false);
  const [lastGains, setLastGains] = useState<number>();
  const [showWonAmount, setShowWonAmount] = useState(false);
  const [delayedWonAmount, setDelayedWonAmount] = useState<number>();

  const previousShowWonAmount = usePrevious(showWonAmount);

  const { address } = useWeb3Auth();

  useEffect(() => {
    if (showWonAmount && !previousShowWonAmount && hasParticipated) {
      setDelayedWonAmount(lastGains);
      setBetsMap({});
    }
  }, [showWonAmount, lastGains]);

  const { sendTransaction } = useAptosTx();
  useAptosEventListener(RouletteEventEnum.payout, (data) => {
    const found = data.amounts.data.find((item: any) => item.key === address);
    if (!found) setHasParticipated(false);
    if (found) {
      setHasParticipated(true);
      setLastGains(Number(found.value));
    }
  });

  const placeBet = async () => {
    const betsKeys = Object.keys(betsMap).filter((key) => betsMap[key] > 0);
    const betsArr = betsKeys.map((key) => rouletteData[key]);
    const amountsArray = betsKeys.map((key) => betsMap[key] * Math.pow(10, 7));

    await sendTransaction({
      type: "entry_function_payload",
      function: `${CASINO_ADDRESS}::casino::place_bets`,
      type_arguments: [],
      arguments: [betsArr, amountsArray],
    });
  };

  const renderSquare = useCallback(
    (content: string, height = SQUARE_HEIGHT, color = "green", id?: string) => {
      return (
        <RouletteTableSquare
          key={id || content}
          height={height.toString() + "px"}
          color={color}
          content={content}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBetsMap((betsMap) => ({ ...betsMap, [id || content]: 0 }));
          }}
          onClick={() => {
            const internalId = id ?? content;
            setBetsMap((betsMap) => ({
              ...betsMap,
              [internalId]: (internalId in betsMap ? betsMap[internalId] : 0) + chipVariants[selectedChip].value,
            }));
          }}
          betAmount={betsMap[id ?? content]}
        />
      );
    },
    [betsMap, selectedChip]
  );

  return (
    <Flex
      m={-4}
      p={3}
      gap3
      x
      sx={{
        height: "100vh",
        flexWrap: { xs: "wrap", md: "nowrap" },
        background: "radial-gradient(circle, rgba(11,51,6,1) 0%, rgba(17,86,13,1) 0%, rgba(11,51,6,1) 100%)",
      }}
    >
      {hasParticipated && showWonAmount && (
        <Flex
          component={Card}
          sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2000 }}
        >
          {lastGains && lastGains > 0
            ? `🎉 You won ${lastGains / Math.pow(10, 8)} APT 🎉`
            : `💀 You didn't win anything 💀`}
        </Flex>
      )}
      <Spinner setShowWonAmount={setShowWonAmount} />
      <Flex y gap3 xc>
        <Flex x ys>
          <Flex width={"50px"}>{renderSquare("0", SQUARE_HEIGHT * 3)}</Flex>
          <Grid container columns={12}>
            {[...row1, ...row2, ...row3].map((c) => {
              return (
                <Grid key={c.toString()} xs={1}>
                  {renderSquare(c.toString(), undefined, c % 2 ? BLACK_COLOR : RED_COLOR)}
                </Grid>
              );
            })}
            {row4.map((c) => {
              return (
                <Grid key={c.toString()} xs={4}>
                  {renderSquare(c.toString())}
                </Grid>
              );
            })}
            {row5.map((c) => {
              return (
                <Grid key={c.toString()} xs={2}>
                  {renderSquare(c.toString())}
                </Grid>
              );
            })}
          </Grid>
          <Flex y width="100px">
            {rightRow.map((id) => renderSquare("2 to 1", undefined, undefined, id))}
          </Flex>
        </Flex>
        <Flex x yc gap2>
          {[ChipsEnum.red, ChipsEnum.green, ChipsEnum.black, ChipsEnum.blue].map((chipType) => (
            <Chip
              key={chipType}
              onClick={() => setSelectedChip(chipType)}
              chipType={chipType}
              sx={{ transition: "0.5s", transform: selectedChip === chipType ? "translate(0%, -20%)" : undefined }}
            />
          ))}
        </Flex>
        <Flex x gap2 component={Card}>
          <Flex y gap1 yc>
            <Typography>
              Current bet:{" "}
              <Typography color="primary">
                {Object.values(betsMap).reduce((acc, curr) => acc + curr, 0) / 10} APT
              </Typography>
            </Typography>
            {delayedWonAmount !== undefined && (
              <Typography>Last gains: {delayedWonAmount / Math.pow(10, 8)} APT</Typography>
            )}
          </Flex>
          <Flex y gap1>
            <Button onClick={() => placeBet()}>Submit bets</Button>
            <Button onClick={() => setBetsMap({})}>Clear bets</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
