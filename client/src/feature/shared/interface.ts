import { z } from "zod";

import { AccountValidation } from "./validation/account.validation";

export type IAccount = z.infer<typeof AccountValidation>;
export interface User extends IAccount {
  role: "user" | "admin";
}
