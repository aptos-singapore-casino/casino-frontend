import { Box, Card } from "@mui/joy";
import { useMemo, useState } from "react";
import { Flex } from "../../components/common/flex";
import { useGetFriends } from "./api/user.api";
import { ChatWindow } from "./components/chatWindow";
import { UserStatus } from "./models/userStatus.enum";

export const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const friends = useGetFriends();
  const onlineCount = useMemo(() => friends.data?.filter((f) => f.status === UserStatus.ONLINE).length, [friends.data]);
  return (
    <>
      {isChatOpen && <ChatWindow />}
      <Flex
        x
        yc
        xc
        px={2}
        py={1}
        sx={{
          cursor: "pointer",
          backgroundColor: (theme) => theme.palette.background.level1,
          ":hover": { opacity: 0.8 },
        }}
        component={Card}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <Box
          sx={{
            width: "12px",
            height: "12px",
            borderRadius: "10px",
            backgroundColor: (theme) => theme.palette.success[500],
          }}
        />
        <Flex flexGrow={1} justifyContent="center">
          {onlineCount} friends online
        </Flex>
      </Flex>
    </>
  );
};
