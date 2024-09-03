/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
   error,
   _req,
   res,
   _next,
) => {
   const statusCode = error.statusCode || 500;
   const message = error.message || "Something went wrong!";

   res.status(statusCode).json({
      success: false,
      message,
      error: error,
   });
};
