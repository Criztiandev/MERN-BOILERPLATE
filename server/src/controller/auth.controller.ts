import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import tokenUtils from "../utils/token.utils";
import EncryptionUtils from "../utils/encryption.utils";
import accountModel from "../model/account.model";
import { AccountValidation } from "../validation/account.validation";
import AccountService from "../service/account.service";

class AccountController {
  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  register = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const account = await this.accountService.createAccount(req.body);

      res.status(201).json({
        payload: account,
        message: "Registered Successfully",
      });
    }
  );

  login = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { accessToken, refreshToken } =
        await this.accountService.loginAccount(req.body);

      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;

      res.status(200).json({
        accessToken,
        message: "Login successfully",
      });
    }
  );

  forgotPassword = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  verifyAccount = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  changePassword = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}

export default new AccountController();
