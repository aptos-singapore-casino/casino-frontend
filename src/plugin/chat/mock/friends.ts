import avery from "../../../assets/avery.jpeg";
import david from "../../../assets/david.jpg";
import mo from "../../../assets/mo.jpg";
import satoshi from "../../../assets/satoshi.jpg";
import { User } from "../models/user.model";
import { UserStatus } from "../models/userStatus.enum";

export const mockFriends: User[] = [
  {
    id: 1,
    avatar: avery,
    username: "Avery Ching",
    status: UserStatus.ONLINE,
    activity: "Playing roulette",
  },
  {
    id: 2,
    avatar: david,
    username: "David Wolinsky",
    status: UserStatus.ONLINE,
    activity: "Playing roulette",
  },
  {
    id: 3,
    avatar: satoshi,
    username: "Satoshi Nakamoto",
    status: UserStatus.OFFLINE,
  },
  {
    id: 4,
    avatar: mo,
    username: "Mo Shaikh",
    status: UserStatus.ONLINE,
  },
];
