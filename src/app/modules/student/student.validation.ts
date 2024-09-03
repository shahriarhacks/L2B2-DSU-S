import { z } from "zod";

// Zod schemas for sub-documents
const createUserName = z.object({
   firstName: z
      .string()
      .min(3, "First name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
   middleName: z.string().optional(),
   lastName: z
      .string()
      .min(3, "Last name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
});

const createGuardian = z.object({
   fatherName: z
      .string()
      .min(3, "Father's name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
   fatherOccupation: z.string().min(1, "Father's occupation is required"),
   fatherContactNo: z.string().min(10, "Father's contact number is required"),
   motherName: z
      .string()
      .min(3, "Mother's name is required")
      .refine((value) => /^[A-Z]/.test(value), {
         message: "First Name must start with a capital letter",
      }),
   motherOccupation: z.string().min(1, "Mother's occupation is required"),
   motherContactNo: z.string().min(10, "Mother's contact number is required"),
});

const createLocalGuardian = z.object({
   name: z.string().min(3, "Local guardian's name is required"),
   occupation: z.string().min(1, "Local guardian's occupation is required"),
   contactNo: z.string().min(10, "Local guardian's contact number is required"),
   address: z.string().min(1, "Local guardian's address is required"),
});

// Main Zod schema for Student
const create = z.object({
   body: z.object({
      password: z.string().min(6).optional(),
      student: z.object({
         name: createUserName,
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
         guardian: createGuardian,
         localGuardian: createLocalGuardian,
         profileImage: z.string().optional(),
      }),
   }),
});

// Export the schema
export const StudentValidationSchema = { create };
