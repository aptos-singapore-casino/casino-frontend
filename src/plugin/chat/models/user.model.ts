import { UserStatus } from "./userStatus.enum";

export interface User {
  id: number;
  username: string;
  avatar: string;
  status: UserStatus;
  activity?: string;
}
