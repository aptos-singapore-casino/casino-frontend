import { Button, Card, Typography } from "@mui/joy";
import { Flex } from "../components/common/flex";

const variants = ["solid", "soft", "plain", "outlined"] as const;
const colors = ["primary", "neutral", "success", "warning", "danger"] as const;

export const ThemeTesterView = () => {
  return (
    <Flex y gap2>
      {colors.map((color) => (
        <Flex y gap1 key={color}>
          <Typography>{color}</Typography>
          <Flex x gap1>
            {variants.map((variant) => (
              <Button size="md" key={variant} color={color} variant={variant}>{`${variant}`}</Button>
            ))}
          </Flex>
        </Flex>
      ))}

      <Flex x gap1>
        <Card
          size="lg"
          sx={{
            backgroundColor: (theme) => theme.palette.background.body,
          }}
          variant="solid"
        >
          Body
        </Card>
        <Card
          size="lg"
          sx={{
            backgroundColor: (theme) => theme.palette.background.backdrop,
          }}
          variant="solid"
        >
          Backdrop
        </Card>
        <Card
          size="lg"
          sx={{
            backgroundColor: (theme) => theme.palette.background.surface,
          }}
          variant="solid"
        >
          Surface
        </Card>
        <Card
          size="lg"
          sx={{
            backgroundColor: (theme) => theme.palette.background.popup,
          }}
          variant="solid"
        >
          Popup
        </Card>
        <Card
          size="lg"
          sx={{
            backgroundColor: (theme) => theme.palette.background.level1,
          }}
          variant="solid"
        >
          Level1
        </Card>
        <Card
          size="lg"
          sx={{
            backgroundColor: (theme) => theme.palette.background.level2,
          }}
          variant="solid"
        >
          Level2
        </Card>
      </Flex>
    </Flex>
  );
};
