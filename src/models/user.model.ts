import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  ownGender: string;
  findGender: string;
  mobileNum: string;
  verifyCode: string;
  isVerify: boolean;
  verifyTimeLimit: string;
  comparePassword(candidatePassword: string): Promise<Boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    username: { type: String },
    password: { type: String, required: true },
    ownGender: { type: String, required: true },
    findGender: { type: String, required: true },
    mobileNum: { type: String },
    isVerify: { type: Boolean, required: true, default: false },
    verifyCode: { type: String, default: null },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   let user = this as UserDocument;

//   if (!user.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
//   const hash = await bcrypt.hashSync(user.password, salt);
//   user.password = hash;
//   return next();
// });

// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   const user = this as UserDocument;

//   return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
// };

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
