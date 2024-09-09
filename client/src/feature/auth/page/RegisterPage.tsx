import { DatePickerField } from "@/common/components/form/DatePickerField";
import InputField from "@/common/components/form/InputField";
import SelectField from "@/common/components/form/SelectField";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { FormBase } from "@/common/components/ui/form";
import { XStack, YStack } from "@/common/components/ui/stack";
import useMultiForm from "@/common/hooks/helper/useMultiform";
import { IAccount } from "@/feature/shared/interface";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountValidationList } from "@/feature/shared/validation/account.validation";

const RegisterPage = () => {
  const { element, isFistStep, currentStep, isLastStep, nextStep, prevStep } =
    useMultiForm([
      <PersonalInfoStep />,
      <OtherInfoStep />,
      <AccountInfoStep />,
    ]);

  const form = useForm<IAccount>({
    defaultValues: {
      firstName: "",
      lastName: "",
      bod: undefined,
      email: "",
      password: "",
    },
    resolver: zodResolver(AccountValidationList[currentStep]),
  });

  const onSubmit = () => {
    if (!isLastStep) {
      nextStep();
      return;
    }

    const result = form.getValues();
    console.log(result);
  };

  return (
    <div className="h-screen border ">
      <div className="h-full  flex justify-center items-center">
        <div className="flex justify-center items-center  p-4">
          <Card>
            <div className="flex justify-center items-center   p-4 rounded-md">
              <div className="  p-4 min-w-[350px] rounded-md">
                <YStack className="mb-8">
                  <h1 className="text-2xl font-bold text-center">
                    Create your Free Account
                  </h1>
                </YStack>
                <FormBase {...form}>
                  <form
                    className="flex flex-col w-full"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    {element}

                    <YStack className="gap-4 my-4">
                      <Button type={"submit"}>
                        {isLastStep ? "Submit" : "Next"}
                      </Button>
                      {!isFistStep && (
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => prevStep()}
                        >
                          Back
                        </Button>
                      )}
                    </YStack>
                    <XStack className="gap-2 items-center justify-center">
                      <span>Already have account ?</span>
                      <a href="/" className="text-blue-600">
                        Login
                      </a>
                    </XStack>
                  </form>
                </FormBase>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

const PersonalInfoStep = () => {
  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
};

const OtherInfoStep = () => {
  return (
    <div className="flex flex-col gap-2">
      <DatePickerField
        name="bod"
        label="Date of Birth"
        description="Your date of birth is used to calculate your age"
      />
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
  );
};

const AccountInfoStep = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <InputField
        type="email"
        label="Email"
        name="email"
        placeholder="Enter your Email"
      />
      <InputField
        type={isShowPassword ? "text" : "password"}
        label="Password"
        name="password"
        placeholder="Enter your Password"
        icon={
          isShowPassword ? (
            <EyeOff size={22} opacity={0.5} />
          ) : (
            <EyeIcon size={22} opacity={0.5} />
          )
        }
        dir="right"
        onPress={() => setIsShowPassword((prev) => !prev)}
      />
    </div>
  );
};
