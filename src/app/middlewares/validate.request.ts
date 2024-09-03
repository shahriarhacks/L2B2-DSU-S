import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
   (schema: AnyZodObject) =>
   async (req: Request, _res: Response, next: NextFunction) => {
      try {
         await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
         });
         next();
      } catch (error) {
         next(error);
      }
   };
