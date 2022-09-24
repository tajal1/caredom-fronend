import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  own_gender: string;
  find_gender: string;
  mobile_num: string;
  verify_code: string;
  verify_time_limit: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    own_gender: { type: String, required: true },
    find_gender: { type: String, required: true },
    mobile_num: { type: String, required: true, unique: true },
    verify_code: { type: String, unique: true },
    verify_time_limit: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
