import { object, string, TypeOf } from "zod";
import _responce from "../../utils/responce";

const payload = {
  body: object({
    verifyCode: string({ required_error: _responce.required }),
  }),
};

const params = {
  params: object({
    _id: string({ required_error: "_responce.formIdRequired" }),
  }),
};

export const updateOtpSchema = object({ ...payload, ...params });
export type updateOtpInput = TypeOf<typeof updateOtpSchema>;
