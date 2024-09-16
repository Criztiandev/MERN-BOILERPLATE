import InputField from "@/common/components/form/InputField";
import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import { FormBase } from "@/common/components/ui/form";
import { SelectSeparator } from "@/common/components/ui/select";
import { XStack, YStack } from "@/common/components/ui/stack";
import useMutate from "@/common/hooks/useMutate";
import { PublicAxios } from "@/common/lib/axios/axios.instance";
import { IAccount, User } from "@/feature/shared/interface";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const { isPending, mutate } = useMutate({
    mutationKey: ["login-account"],
    mutationFn: async (value: Pick<IAccount, "email" | "password">) =>
      await PublicAxios.post("/login", value),
  });

  const onSubmit = (value: Pick<User, "email" | "password">) => {
    mutate(value);
  };

  return (
    <div className="h-screen border ">
      <div className="h-full grid grid-cols-2 gap-4">
        <div className=""></div>
        <div className="flex justify-center items-center  p-4">
          <div className=" w-full max-w-[400px]">
            <div className=" w-full">
              <YStack className="gap-2 mb-8">
                <h1 className="text-3xl font-bold">Sign in to your account</h1>
              </YStack>
              <FormBase {...form}>
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <InputField
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your Email"
                  />

                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Enter your Password"
                  />

                  <SelectSeparator />

                  <XStack className="justify-between items-center">
                    <XStack className="gap-2 items-center">
                      <Checkbox />
                      <span>Remember me</span>
                    </XStack>

                    <a href="/forgot-password">Forgot password</a>
                  </XStack>

                  <Button className="mb-8" disabled={isPending}>
                    Login
                  </Button>
                  <XStack className="gap-2 items-center justify-center">
                    <span>Don't have an account</span>
                    <a href="/register" className="text-blue-600">
                      Create an account
                    </a>
                  </XStack>
                </form>
              </FormBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
