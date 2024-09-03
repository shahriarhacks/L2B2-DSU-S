/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status";

export const notFound: RequestHandler = (req, res, _next) => {
   return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: `${req.originalUrl} API route not found`,
      error: "Not Found API path url",
   });
};
