import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validate.request";
import { StudentValidationSchema } from "../student/student.validation";

const router = Router();

router.post(
   "/create-student",
   validateRequest(StudentValidationSchema.create),
   UserController.createStudent,
);

export const UserRoute = router;
