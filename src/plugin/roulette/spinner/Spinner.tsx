import { Box, List } from "@mui/joy";
import { FC, useRef, useState } from "react";
import { Flex } from "../../../components/common/flex";
import { RouletteEventEnum, useAptosEventListener } from "../../../hooks/useAptosEventsListener";
import { BLACK_COLOR, RED_COLOR } from "../RouletteConstants";
import "./Spinner.less";

const red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
const SPINS_COUNT = 5;
//In seconds
const SPIN_DURATION = 5;

//Mapping between board number and degree position
const DEGREES_POSITION = {
  1: 288,
  2: 116,
  3: 40,
  4: 97,
  5: 248,
  6: 156,
  7: 364,
  8: 217,
  9: 326,
  10: 238,
  11: 197,
  12: 22,
  13: 176,
  14: 308,
  15: 77,
  16: 268,
  17: 135,
  18: 345,
  19: 87,
  20: 298,
  21: 106,
  22: 336,
  23: 228,
  24: 258,
  25: 126,
  26: 50,
  27: 166,
  28: 13,
  29: 355,
  30: 206,
  31: 317,
  32: 68,
  33: 278,
  34: 145,
  35: 391,
  36: 187,
  0: 59,
};

// $reset.hide();

// $mask.text(maskDefault);

export const Spinner: FC<{ setShowWonAmount: (val: boolean) => void }> = ({ setShowWonAmount }) => {
  const innerRef = useRef<HTMLUListElement>(null);
  const [targetNumber, setTargetNumber] = useState<number>();
  const [previousResults, setPreviousResults] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  useAptosEventListener(RouletteEventEnum.result, (res) => spin(res.game_result));

  const spin = (targetNumber: number) => {
    if (!innerRef) return;
    innerRef.current?.classList.add("reset");
    setTimeout(() => {
      innerRef.current?.classList.remove("reset");
      setIsSpinning(true);
      // setTargetNumber(Math.floor(Math.random() * 36));
      setTargetNumber(targetNumber);
      setTimeout(() => {
        setIsSpinning(false);
        setPreviousResults([...previousResults, targetNumber]);
        setDisplayResult(true);
        setShowWonAmount(true);
        setTimeout(() => {
          setDisplayResult(false);
          setShowWonAmount(false);
        }, 3000);
      }, SPIN_DURATION * 1000);
    }, 50);
  };

  return (
    <Flex y gap2 xc>
      <div className="main" style={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 1,
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
          }}
        >
          <Flex
            x
            xc
            sx={{
              height: "200px",
              width: displayResult ? "100px" : "130px",
              position: "absolute",
              top: displayResult ? "10%" : "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              transition: "1s",
            }}
          >
            <img src="https://aptos.dev/img/aptos_word_dark.svg" width={"100%"} style={{ transition: "1s" }} />
          </Flex>
          <Flex
            x
            xc
            yc
            sx={{
              position: "absolute",
              transform: `translate(-50%, -50%) scaleY(${displayResult ? 1 : 0})`,
              transformOrigin: "bottom",
              border: "1px solid white",
              top: displayResult ? "70%" : "30%",
              left: "50%",
              borderRadius: "10px",
              fontSize: "1.5rem",
              transition: displayResult ? "1s" : "1s",
              p: 2,
              backgroundColor:
                previousResults.at(-1) === 0
                  ? "green"
                  : red.includes(previousResults.at(-1)!)
                  ? RED_COLOR
                  : BLACK_COLOR,
            }}
          >
            {previousResults.at(-1)}
          </Flex>
        </Box>
        <div className="plate" id="plate">
          <List
            className="inner"
            data-spinto={targetNumber}
            ref={innerRef}
            sx={{
              ":before": {
                transform: targetNumber
                  ? `rotateZ(${
                      360 * -SPINS_COUNT + DEGREES_POSITION[targetNumber as keyof typeof DEGREES_POSITION]
                    }deg)`
                  : undefined,
                transition: isSpinning ? `transform ${SPIN_DURATION}s ease-out` : undefined,
              },
            }}
          >
            {[
              32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22,
              18, 29, 7, 28, 12, 35, 3, 26, 0,
            ].map((c) => {
              return (
                <li key={c} className="number">
                  <label>
                    <input type="radio" name="pit" value={c} checked={targetNumber === c} readOnly />
                    <span className="pit">{c}</span>
                  </label>
                </li>
              );
            })}
          </List>
        </div>
      </div>
      {/* <Button sx={{ width: "100px" }} onClick={() => spin(Math.floor(Math.random() * 36))} disabled={isSpinning}>
        Spin
      </Button> */}
      <Flex x yc gap1>
        {previousResults.slice(-5).map((res, i) => (
          <Flex
            key={i}
            sx={{
              borderRadius: "10px",
              backgroundColor: res === 0 ? "green" : red.includes(res) ? RED_COLOR : BLACK_COLOR,
              p: 2,
            }}
          >
            {res}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
