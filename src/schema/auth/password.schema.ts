import { object, string, TypeOf } from "zod";
import _responce from "../../utils/responce";

const payload = {
  body: object({
    password: string({ required_error: _responce.required }),
    passwordConformation: string({ required_error: _responce.required }),
  }),
};

const params = {
  params: object({
    _id: string({ required_error: "_responce.formIdRequired" }),
  }),
};

export const createPasswordSchema = object({ ...payload, ...params });
export type createPasswordInput = TypeOf<typeof createPasswordSchema>;
