import { useQuery } from "@tanstack/react-query";
import { mockFriends } from "../mock/friends";

export const useGetFriends = () => useQuery(["friends"], () => mockFriends, { initialData: [] });
