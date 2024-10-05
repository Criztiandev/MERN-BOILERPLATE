import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface ServerResponse {
  payload:
    | Array<Record<string, unknown>>
    | Record<string, unknown>
    | string
    | number;
  message: string;
}

type CustomQueryFunction<TData> = (
  context: QueryFunctionContext
) => Promise<TData>;

interface CustomUseQueryOptions<TData, TError>
  extends Omit<UseQueryOptions<TData, TError>, "queryFn"> {
  queryFn: CustomQueryFunction<TData>;
}

const useFetch = <TData = unknown, TError = AxiosError>(
  options: CustomUseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>({
    ...options,
    queryFn: async (context: QueryFunctionContext) => {
      return await options.queryFn(context);
    },
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export default useFetch;
