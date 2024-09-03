import { Response } from "express";

type TResponseSender<T> = {
   statusCode: number;
   success: boolean;
   message?: string;
   data?: T;
};

export const responseSender = <T>(res: Response, data: TResponseSender<T>) => {
   return res.status(data.statusCode).json({
      success: data.success,
      message: data.message,
      data: data.data,
   });
};
