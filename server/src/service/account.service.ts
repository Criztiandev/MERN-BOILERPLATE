import { ObjectId } from "mongoose";
import { IAccount, ILoginCredentials } from "../interface/account.interface";
import AccountRepository from "../repository/account.repository";
import EncryptionUtils from "../utils/encryption.utils";
import {
  AccountValidation,
  loginValidation,
} from "../validation/account.validation";
import tokenUtils from "../utils/token.utils";

class AccountService {
  private repository: AccountRepository;
  constructor() {
    this.repository = new AccountRepository();
  }

  async createAccount(
    credentials: IAccount
  ): Promise<ObjectId | string | null> {
    const validatedPayload = await AccountValidation.safeParseAsync(
      credentials
    );

    if (!validatedPayload.success) {
      const path = validatedPayload.error.issues[0].path[0].toString();
      throw new Error(`${path} ${validatedPayload.error.issues[0].message}`);
    }

    const { email, password } = validatedPayload.data;

    const accountCredentials = await this.repository.findOne({ email }, "_id");
    if (accountCredentials) throw new Error("Account already exist");

    const hashedPassword = await EncryptionUtils.hashPassword(password);

    const finalPayload = {
      ...credentials,
      password: hashedPassword,
    };

    const createdCredentials = await this.repository.create(finalPayload);
    if (!createdCredentials) throw new Error("Create account failed`");

    return createdCredentials._id as ObjectId;
  }

  async loginAccount(credentials: ILoginCredentials) {
    const { email, password } = credentials;

    const validatedPayload = await loginValidation.safeParseAsync(credentials);

    if (!validatedPayload.success) {
      const path = validatedPayload.error.issues[0].path[0].toString();
      throw new Error(`${path} ${validatedPayload.error.issues[0].message}`);
    }

    const accountCredentials = await this.repository.findOne({ email });

    if (!accountCredentials)
      throw new Error("Account does'nt exist, Please register");

    const isPasswordCorrect = await EncryptionUtils.comparePassword(
      password,
      accountCredentials?.password
    );

    if (!isPasswordCorrect)
      throw new Error("Incorrect Password, Please try again later");

    const payload = {
      id: accountCredentials?._id,
      fullName: `${accountCredentials.firstName} ${accountCredentials.lastName}`,
      email,
      role: accountCredentials?.role,
    };

    const accessToken = tokenUtils.generateToken<any>(
      payload,
      process.env.ACCESS_TOKEN_EXPIRATION
    );
    const refreshToken = tokenUtils.generateToken<any>(
      payload,
      process.env.REFRESH_TOKEN_EXPIRATION
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default AccountService;
