import { LoginResponsePayload } from "./../auth/interfaces";
import { z } from "zod";

import { AccountValidation } from "./validation/account.validation";

export type Account = z.infer<typeof AccountValidation>;

export interface User extends LoginResponsePayload {
  role: "user" | "admin";
}
