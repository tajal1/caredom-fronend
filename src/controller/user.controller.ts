import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, patchPassword, verifyOTP } from "../service/user.service";
import logger from "../utils/logger";
import { failed, success } from "../common/response";
import { createPasswordInput } from "../schema/auth/password.schema";
import { updateOtpInput } from "../schema/auth/otp.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body as any);
    return res.status(200).json(success(user));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function otpHandler(
  req: Request<{}, {}, updateOtpInput["body"]>,
  res: Response
) {
  try {
    let data = await verifyOTP(req.body as any, req.params, { new: true });
    return res.status(200).json(success(data));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function patchPasswordHandler(
  req: Request<{}, {}, createPasswordInput["body"]>,
  res: Response
) {
  try {
    let data = await patchPassword(req.body as any, req.params, { new: true });
    return res.status(200).json(success(data));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
