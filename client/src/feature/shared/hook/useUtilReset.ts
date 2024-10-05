import useLocalStorage from "@/common/hooks/useLocalStorage";
import useAccountStore from "../store/useAccountStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useUtilReset = () => {
  const { clearCredentials } = useAccountStore();
  const { removeItem } = useLocalStorage("user");
  const queryClient = useQueryClient();

  const reset = useCallback(() => {
    clearCredentials();
    removeItem();
    queryClient.clear();
  }, []);

  return { reset };
};

export default useUtilReset;
