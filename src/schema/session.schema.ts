import { object, string } from "zod";
import _responce from "../utils/responce";

/* EMAIL_PASSWORD_VALIDATION_FOR_TOKEN_GENERATE */
export const createSessionSchema = object({
  
  body: object({
    email: string({ required_error: _responce.required }),
    password: string({ required_error: _responce.required }),
  })

});
