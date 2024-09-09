import { ObjectId } from "mongoose";
import { IAccount } from "../interface/account.interface";
import AccountRepository from "../repository/account.repository";
import EncryptionUtils from "../utils/encryption.utils";
import { AccountValidation } from "../validation/account.validation";

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
}

export default AccountService;
