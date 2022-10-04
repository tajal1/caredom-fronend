import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    // TODO: remove verifyCode
    input["verifyCode"] = "123456";

    var responsedata: any = {};
    const exist = await UserModel.findOne({
      $or: [{ email: input.email }, { mobileNum: input.mobileNum }],
    });

    if (!exist) {
      const user = await UserModel.create(input);
      return (responsedata.user = user);
    } else {
      return (responsedata.message = "Email or mobile number are duplicate");
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function patchPassword(
  update: UpdateQuery<UserDocument>,
  query: FilterQuery<UserDocument>,
  options: QueryOptions
) {
  const responsedata: any = {};
  const user = await UserModel.findOneAndUpdate(query, update, options);
  return (responsedata.user = user);
}

export async function verifyOTP(
  update: UpdateQuery<UserDocument>,
  query: FilterQuery<UserDocument>,
  options: QueryOptions
) {
  const responsedata: any = {};
  const user: any = await UserModel.findOne(query);
  console.log(update.verifyCode === user.verifyCode, user.isVerify === false);

  if (update.verifyCode === user.verifyCode && user.isVerify === false) {
    update.verifyCode == null;
    update.isVerify == true;

    const verifyOTP = await UserModel.findOneAndUpdate(query, update, options);
    return (responsedata.message = "OTP verify sucessfully");
  } else {
    return (responsedata.verifyOTP = "false");
  }

  // (user.isVerify !== true && verifyCode === update) ??
  //   (await UserModel.findOneAndUpdate(query, update, options));

  // user.verifyCode

  // if (!user) return false;
  // const otp = await UserModel.findOneAndUpdate(input, { new: true });
  // return otp;
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) return false;
  const inValid = await user.comparePassword(password);
  if (!inValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
