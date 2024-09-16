import { AxiosError, AxiosResponse } from "axios";
import { MutationOptions, QueryKey, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface ErrorResponse {
  error: string;
  status: number;
}

type MutationFn<T> = (data: T) => Promise<AxiosResponse<T>>;

interface UseMutateOptions<T>
  extends Omit<MutationOptions<T, AxiosError<ErrorResponse>, T>, "mutationFn"> {
  mutationFn: MutationFn<T>;
  queryKey?: QueryKey;
}

function useMutate<T>({
  mutationFn,
  onError,
  ...options
}: UseMutateOptions<T>) {
  return useMutation<T, AxiosError<ErrorResponse>, T>({
    mutationFn: async (variables: T) => {
      const response = await mutationFn(variables);
      return response.data;
    },
    ...options,
    onError: (error, variables, context) => {
      let errorMessage: string;

      if (error.response) {
        const errorResponse = error.response.data as ErrorResponse;
        errorMessage =
          errorResponse.error || "An error occurred with the response";
      } else if (error.request) {
        errorMessage = "No response received from the server";
      } else {
        errorMessage = error.message || "An unknown error occurred";
      }

      if (onError) {
        onError(error, variables, context);
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
}

export default useMutate;
