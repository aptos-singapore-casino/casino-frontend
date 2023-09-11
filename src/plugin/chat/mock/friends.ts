import { User } from "../models/user.model";
import { UserStatus } from "../models/userStatus.enum";

export const mockFriends: User[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=1",
    username: "Vitalik Buterin",
    status: UserStatus.ONLINE,
    activity: "Playing roulette",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=2",
    username: "Arjan",
    status: UserStatus.ONLINE,
    activity: "Playing chess",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?img=3",
    username: "Satoshi Nakamoto",
    status: UserStatus.OFFLINE,
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?img=4",
    username: "Mo Shaikh",
    status: UserStatus.ONLINE,
  },
];
