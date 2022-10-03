import { Express } from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { updateOtpSchema } from "../schema/auth/otp.schema";
import {
  createUserHandler,
  patchPasswordHandler,
  otpHandler,
} from "../controller/user.controller";

function routes(app: Express) {
  app.post(
    "/api/user/signup",
    validateResource(createUserSchema),
    createUserHandler
  );

  app.put(
    "/api/user/verify-otp/:_id",
    validateResource(updateOtpSchema),
    otpHandler
  );
}

export default routes;
