import { object, string, TypeOf } from "zod";
import _responce from "../utils/responce";

export const createUserSchema = object({
  body: object({
    email: string({ invalid_type_error: "Name must be a string" }).email({
      message: "Invalid email address",
    }),
    username: string({ invalid_type_error: "Name must be a string" }),
    ownGender: string({
      required_error: _responce.required,
      invalid_type_error: "Name must be a string",
    }),
    findGender: string({
      required_error: _responce.required,
      invalid_type_error: "Name must be a string",
    }),
    mobileNum: string({ invalid_type_error: "Name must be a string" })
      .min(6, _responce.passwordLength)
      .max(32, _responce.passwordLength),
    password: string({ required_error: _responce.required })
      .min(6, _responce.passwordLength)
      .max(32, _responce.passwordLength),
    passwordConfirmation: string({
      invalid_type_error: "Name must be a string",
    })
      .min(6, _responce.passwordLength)
      .max(32, _responce.passwordLength),
    verifyCode: string({ invalid_type_error: "Name must be a string" }),
    verifyTimeLimit: string({ invalid_type_error: "Name must be a string" }),
  })
    .partial()
    .refine(
      ({ email, mobileNum }) => email !== undefined || mobileNum !== undefined,
      { message: "email or mobileNum One of the fields must be defined" }
    ),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
