import { AttachMoney, CalendarMonth, CreditCard, Lock, Person } from "@mui/icons-material";
import { Button, Input, Typography } from "@mui/joy";
import { Flex } from "./common/flex";

export const FiatDeposit = () => {
  return (
    <Flex y xc gap2 fullwidth>
      <Input startDecorator={<Person />} placeholder="Full name" sx={{ width: "300px" }} />
      <Input startDecorator={<CreditCard />} placeholder="Card number" sx={{ width: "300px" }} />
      <Flex x yc xc>
        <Input startDecorator={<CalendarMonth />} placeholder="MM/YY" sx={{ width: "150px" }} />
        <Input startDecorator={<Lock />} placeholder="CVC" sx={{ width: "150px" }} />
      </Flex>

      <Input defaultValue={100} startDecorator={<AttachMoney />} placeholder="USD Amount" sx={{ width: "300px" }} />
      <Typography>Send $100 to receive 17.5 APT</Typography>
      <Button>Deposit</Button>
    </Flex>
  );
};
