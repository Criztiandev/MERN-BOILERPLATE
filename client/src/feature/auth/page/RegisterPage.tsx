import { DatePickerField } from "@/common/components/form/DatePickerField";
import InputField from "@/common/components/form/InputField";
import SelectField from "@/common/components/form/SelectField";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { FormBase } from "@/common/components/ui/form";
import { XStack, YStack } from "@/common/components/ui/stack";
import useMultiForm from "@/common/hooks/helper/useMultiform";
import { User } from "@/feature/shared/interface";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { element, isFistStep, isLastStep, nextStep, prevStep } = useMultiForm([
    <PersonalInfoStep />,
    <OtherInfoStep />,
  ]);
  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (value: Pick<User, "email" | "password">) => {
    console.log(value);
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
                      <Button
                        type={isLastStep ? "submit" : "button"}
                        onClick={() => nextStep()}
                      >
                        Next
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
