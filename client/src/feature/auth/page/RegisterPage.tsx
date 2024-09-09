import InputField from "@/common/components/form/InputField";
import SelectField from "@/common/components/form/SelectField";
import { Button } from "@/common/components/ui/button";
import { Checkbox } from "@/common/components/ui/checkbox";
import { FormBase } from "@/common/components/ui/form";
import { XStack, YStack } from "@/common/components/ui/stack";
import { IAccount, User } from "@/feature/shared/interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountValidation } from "@/feature/shared/validation/account.validation";
import { DatePickerField } from "@/common/components/form/DatePickerField";
const RegisterPage = () => {
  const form = useForm<IAccount>({
    defaultValues: {
      firstName: "",
      lastName: "",
      bod: undefined,
      email: "",
      password: "",
    },
    resolver: zodResolver(AccountValidation),
  });

  const onSubmit = (value: Pick<User, "email" | "password">) => {
    console.log(value);
  };

  return (
    <div className="h-screen border ">
      <div className="h-full grid grid-cols-2 gap-4">
        <div className=""></div>
        <div className="flex justify-center items-center  p-4 border w-full">
          <div className="max-w-[500px] w-full">
            <div className="  p-4 w-full  rounded-md">
              <YStack className="gap-2 mb-8">
                <h1 className="text-3xl font-bold">Create an Account</h1>
                <div className="space-x-2">
                  <span>
                    Start your website in seconds. Already have an account?
                  </span>
                  <a href="/" className="text-blue-600">
                    Login Here
                  </a>
                </div>
              </YStack>
              <FormBase {...form}>
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <InputField
                    type="text"
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your First Name"
                  />
                  <InputField
                    type="text"
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your Last Name"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <DatePickerField name="bod" label="Date of Birth" />
                    <SelectField
                      label="Gender"
                      name="gender"
                      placeholder="Select Gender"
                      options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ]}
                    />
                  </div>

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

                  <XStack className="gap-3 items-start my-4">
                    <span>
                      <Checkbox />
                    </span>
                    <span>
                      By signing up, you are creating a Flowbite account, and
                      you agree to Flowbite’s Terms of Use and Privacy Policy.
                    </span>
                  </XStack>

                  <XStack className="gap-3 items-center">
                    <Checkbox />
                    <span>Email me about product updates and resources.</span>
                  </XStack>

                  <Button className="mb-8">Create an Account</Button>
                </form>
              </FormBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
