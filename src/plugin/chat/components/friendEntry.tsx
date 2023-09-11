import { Avatar, Typography } from "@mui/joy";
import { FC } from "react";
import { Flex } from "../../../components/common/flex";
import { User } from "../models/user.model";
import { UserStatus } from "../models/userStatus.enum";

interface Props {
  friend: User;
}

export const FriendEntry: FC<Props> = ({ friend }) => {
  const isOffline = friend.status === UserStatus.OFFLINE && !friend.activity;
  const isInGame = friend.activity;
  return (
    <Flex
      gap1
      mx={-2}
      px={2}
      py={1}
      my={0}
      sx={{
        cursor: "pointer",
        ":hover": { backgroundColor: (theme) => theme.palette.background.level1, opacity: 0.8 },
      }}
    >
      <Avatar src={friend.avatar} size="sm" />
      <Flex y>
        <Typography level="body-xs" color={isOffline ? "neutral" : isInGame ? "danger" : "warning"}>
          {friend.username}
        </Typography>
        <Typography level="body-xs" sx={{ color: (theme) => theme.palette.primary[700] }}>
          {friend.activity}
        </Typography>
        <Typography level="body-xs" sx={{ color: (theme) => theme.palette.warning[500] }}>
          {!isOffline && !isInGame && "Online"}
        </Typography>
        <Typography level="body-xs" sx={{ color: (theme) => theme.palette.neutral[700] }}>
          {isOffline && "Offline"}
        </Typography>
      </Flex>
    </Flex>
  );
};
