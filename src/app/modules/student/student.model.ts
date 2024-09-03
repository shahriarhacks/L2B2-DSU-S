import { model, Schema } from "mongoose";
import {
   StudentModel,
   TGuardian,
   TLocalGuardian,
   TStudent,
   TUserName,
} from "./student.interface";

// Mongoose schema definitions
const userNameSchema = new Schema<TUserName>({
   firstName: { type: String, required: true },
   middleName: { type: String },
   lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
   fatherName: { type: String, required: true },
   fatherOccupation: { type: String, required: true },
   fatherContactNo: { type: String, required: true },
   motherName: { type: String, required: true },
   motherOccupation: { type: String, required: true },
   motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
   name: { type: String, required: true },
   occupation: { type: String, required: true },
   contactNo: { type: String, required: true },
   address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>(
   {
      uid: { type: String, required: true, unique: true },
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
         unique: true,
      },
      name: { type: userNameSchema, required: true },
      email: { type: String, required: true },
      contactNo: { type: String, required: true },
      emergencyContactNo: { type: String, required: true },
      gender: {
         type: String,
         enum: ["male", "female", "other"],
         required: true,
      },
      dateOfBirth: { type: String },
      bloodGroup: {
         type: String,
         enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      presentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
      guardian: { type: guardianSchema, required: true },
      localGuardian: { type: localGuardianSchema, required: true },
      profileImage: { type: String },
      isDeleted: { type: Boolean, required: true, default: false },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   },
);

// virtual
studentSchema.virtual("fullName").get(function () {
   return this.name.firstName + this.name.middleName + this.name.lastName;
});

// Query Middleware
//  studentSchema.pre('find', function (next) {
//    this.find({ isDeleted: { $ne: true } });
//    next();
//  });

//  studentSchema.pre('findOne', function (next) {
//    this.find({ isDeleted: { $ne: true } });
//    next();
//  });

studentSchema.pre("aggregate", function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
   next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (uid: string) {
   const existingUser = await Student.findOne({ uid });
   return existingUser;
};

// Mongoose model
export const Student = model<TStudent>("Student", studentSchema);
