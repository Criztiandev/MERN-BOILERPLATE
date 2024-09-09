import { z } from "zod";
import {
  AccountValidation,
  loginValidation,
} from "../validation/account.validation";

export type IAccount = z.infer<typeof AccountValidation> & {
  role?: string;
};

export type ILoginCredentials = z.infer<typeof loginValidation>;
