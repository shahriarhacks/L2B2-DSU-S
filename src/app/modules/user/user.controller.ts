import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { UserService } from "./user.service";
import { responseSender } from "../../utils/response.sender";
import httpStatus from "http-status";

const createStudent = asyncHandler(async (req: Request, res: Response) => {
   const { password, student } = req.body;

   const result = await UserService.createStudent(password, student);

   responseSender(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Student created successfully",
      data: result,
   });
});

export const UserController = {
   createStudent,
};
