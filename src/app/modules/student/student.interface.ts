import { Model, Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TUserName = {
   firstName: string;
   middleName?: string;
   lastName: string;
};

export type TGuardian = {
   fatherName: string;
   fatherOccupation: string;
   fatherContactNo: string;
   motherName: string;
   motherOccupation: string;
   motherContactNo: string;
};
export type TLocalGuardian = {
   name: string;
   occupation: string;
   contactNo: string;
   address: string;
};

export type TStudent = {
   uid: string;
   user: Types.ObjectId | TUser;
   name: TUserName;
   email: string;
   contactNo: string;
   emergencyContactNo: string;
   gender: "male" | "female" | "other";
   dateOfBirth?: string;
   bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
   presentAddress: string;
   permanentAddress: string;
   guardian: TGuardian;
   localGuardian: TLocalGuardian;
   profileImage?: string;
   isDeleted: boolean;
};

export interface StudentModel extends Model<TStudent> {
   // eslint-disable-next-line no-unused-vars
   isUserExists(id: string): Promise<TStudent | null>;
}
