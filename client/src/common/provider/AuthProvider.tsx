import { FC, PropsWithChildren } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../hooks/useLocalStorage";
import useAccountStore from "@/feature/shared/store/useAccountStore";
import { User } from "@/feature/shared/interface";
import { ProtectedAxios } from "../lib/axios/axios.instance";
import LoadingScreen from "../components/utils/LoadingScreen";
import useUtilReset from "@/feature/shared/hook/useUtilReset";
import useFetch from "../hooks/useFetch";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setCredentials } = useAccountStore();
  const { reset } = useUtilReset();
  const { getItem } = useLocalStorage("user");

  const storedUser = getItem() as User | null;

  const { isLoading, isError } = useFetch({
    queryKey: [`account-${storedUser?.id}`],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/account/profile");
      return 
    },
    retry: 1,
    enabled: !!storedUser?.id,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    reset();
  }

  return children;
};

export default AuthProvider;
