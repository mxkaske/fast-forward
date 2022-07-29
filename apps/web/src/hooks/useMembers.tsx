import fetcher from "@/utils/fetcher";
import { Member } from "@prisma/client";
import useSWR from "swr";

const useMembers = () => {
  const { data, mutate } = useSWR<Member[]>(`/api/member`, fetcher);
  return { data, mutate };
};

export default useMembers;
