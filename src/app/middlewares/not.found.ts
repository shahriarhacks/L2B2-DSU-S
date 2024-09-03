/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res, _next) => {
   return res.status(404).json({
      success: false,
      message: `${req.originalUrl} API route not found`,
      error: "Not Found API path url",
   });
};
