import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import { env_config } from "../../../config/env.config";

const userSchema = new Schema<TUser>(
   {
      id: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      needsPasswordChange: {
         type: Boolean,
         default: true,
      },
      role: {
         type: String,
         enum: ["student", "faculty", "admin"],
      },
      status: {
         type: String,
         enum: ["active", "blocked"],
         default: "active",
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   },
);

userSchema.pre("save", async function (next) {
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this;
   user.password = await bcrypt.hash(user.password, Number(env_config.bc_salt));

   next();
});

userSchema.post("save", function (doc, next) {
   doc.password = "********";
   next();
});

export const User = model<TUser>("User", userSchema);
