import { z } from "zod";

export const AccountValidation = z.object({
  firstName: z
    .string()
    .min(1, "First name is too short")
    .max(64, "First name is too long"),

  lastName: z
    .string()
    .min(1, "Last name is too short")
    .max(64, "Last name is too long"),

  bod: z.string().min(1, "Date is too short").max(64, "Date is too long"),
  gender: z.enum(["male", "female"]),

  email: z.string().min(1, "Email is too short").max(64, "Email is too long"),
  password: z
    .string()
    .min(8, "Password is too short")
    .max(16, "Password is too long"),
});

export const loginValidation = AccountValidation.pick({
  email: true,
  password: true,
});
