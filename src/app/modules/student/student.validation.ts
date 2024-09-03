import { z } from "zod";

// Zod schemas for sub-documents
const userNameValidationSchema = z.object({
   firstName: z
      .string()
      .min(1, "First name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
   middleName: z.string().optional(),
   lastName: z
      .string()
      .min(1, "Last name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
});

const guardianValidationSchema = z.object({
   fatherName: z
      .string()
      .min(1, "Father's name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
   fatherOccupation: z.string().min(1, "Father's occupation is required"),
   fatherContactNo: z.string().min(10, "Father's contact number is required"),
   motherName: z
      .string()
      .min(1, "Mother's name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
   motherOccupation: z.string().min(1, "Mother's occupation is required"),
   motherContactNo: z.string().min(10, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
   name: z.string().min(1, "Local guardian's name is required"),
   occupation: z.string().min(1, "Local guardian's occupation is required"),
   contactNo: z.string().min(10, "Local guardian's contact number is required"),
   address: z.string().min(1, "Local guardian's address is required"),
});

// Main Zod schema for Student
const studentValidationSchema = z.object({
   uid: z.string().min(1, "UID is required"),
   name: userNameValidationSchema,
   email: z.string().email().min(1, "Email is required"),
   contactNo: z.string().min(10, "Contact number is required"),
   emergencyContactNo: z
      .string()
      .min(10, "Emergency contact number is required"),
   gender: z.enum(["male", "female", "other"]),
   dateOfBirth: z.string().optional(),
   bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
   presentAddress: z.string().min(1, "Present address is required"),
   permanentAddress: z.string().min(1, "Permanent address is required"),
   guardian: guardianValidationSchema,
   localGuardian: localGuardianValidationSchema,
   profileImage: z.string().optional(),
   isDeleted: z.boolean().default(false),
});

// Export the schema
export const StudentValidation = { studentValidationSchema };
