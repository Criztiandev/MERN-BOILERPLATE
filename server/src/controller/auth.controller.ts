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
      const { email, password } = req.body;

      const isPasswordCorrect = await EncryptionUtils.comparePassword(
        password,
        "$2b$10$4iV4B6HW95rZ6KllNaLFUOeBSn/fCd10kJldWwvfuxWqjf5OJyTKm"
      );

      if (!isPasswordCorrect)
        throw new Error("Incorrect Password, Please try again later");

      const payload = { id: "#1223", email };

      // generate here the sessoion
      const currentSession = 0;

      const accessToken = tokenUtils.generateToken<any>(payload, "5s");
      const refreshToken = tokenUtils.generateToken<any>(payload, "1yr");

      req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken;

      res.status(200).json({
        payload,
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
