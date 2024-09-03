import { env_config } from "../../../config/env.config";
import { USER_ROLE } from "../../enums/user";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudent = async (password: string, payload: TStudent) => {
   const user: Partial<TUser> = {};

   user.password = password || (env_config.def_student_pass as string);
   user.role = USER_ROLE.STUDENT;
   user.uid = "00001";

   const createdUser = await User.create(user);

   if (Object.keys(createdUser).length > 0) {
      payload.uid = createdUser.uid;
      payload.user = createdUser._id;
      const student = await Student.create(payload);
      return student;
   }
};

export const UserService = {
   createStudent,
};
