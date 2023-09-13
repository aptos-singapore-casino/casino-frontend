import { Card, Typography } from "@mui/joy";
import { useMemo } from "react";
import Draggable from "react-draggable";
import { Flex } from "../../../components/common/flex";
import { useStatePersisted } from "../../../hooks/useStatePersisted";
import { useGetFriends } from "../api/user.api";
import { UserStatus } from "../models/userStatus.enum";
import { FriendEntry } from "./friendEntry";

export const ChatWindow = () => {
  const friends = useGetFriends();
  const online = useMemo(
    () => friends.data?.filter((f) => f.status === UserStatus.ONLINE && !f.activity),
    [friends.data]
  );

  const [lastPos, setLastPos] = useStatePersisted("plugin.chat.chatWindow.lastPos", { x: 0, y: 0 });

  const offline = useMemo(() => friends.data?.filter((f) => f.status === UserStatus.OFFLINE), [friends.data]);
  const inGame = useMemo(() => friends.data?.filter((f) => f.activity), [friends.data]);
  return (
    <Draggable defaultPosition={lastPos} onStop={(_, data) => setLastPos({ x: data.lastX, y: data.lastY })}>
      <Flex y position="absolute" width="400px" top={0} left={0} sx={{ zIndex: 20 }}>
        <Flex
          component={Card}
          py={1}
          borderRadius={0}
          sx={{
            backgroundColor: (theme) => theme.palette.background.level1,
          }}
        >
          Friend list
        </Flex>
        <Flex component={Card} borderRadius={"0px 10px 10px"}>
          {[
            { label: "In Game", items: inGame },
            { label: "Online Friends", items: online },
            { label: "Offline Friends", items: offline },
          ].map(({ label, items }) => (
            <>
              <Typography level="body-sm" fontWeight={800}>
                {label} <Typography level="body-xs">({items.length})</Typography>
              </Typography>
              <Flex y gap={0}>
                {items.map((friend) => (
                  <FriendEntry friend={friend} />
                ))}
              </Flex>
            </>
          ))}
        </Flex>
      </Flex>
    </Draggable>
  );
};
