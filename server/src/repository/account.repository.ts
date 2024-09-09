// account.repository.ts
import { Model, ObjectId } from "mongoose";
import BaseRepository from "./base.repository";
import { IAccount } from "../interface/account.interface";
import accountModel, { IAccountDocument } from "../model/account.model";

class AccountRepository extends BaseRepository<IAccountDocument> {
  constructor(model: Model<IAccountDocument> = accountModel) {
    super(model);
  }

  profile = async (ID: ObjectId) => {
    try {
      return this.findById(ID);
    } catch {
      return null;
    }
  };
}

export default AccountRepository;
