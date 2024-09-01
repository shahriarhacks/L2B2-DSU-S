import mongoose from "mongoose";
import { env_config } from "../../config/env.config";

export const connectDB = async () => {
   try {
      const connectionInstance = await mongoose.connect(
         env_config.mongo_uri as string,
      );
      console.log(
         `🎉 MONGODB connected !! DB HOST ${connectionInstance.connection.host}`,
      );
   } catch (error) {
      console.log("MONGODB connection ERROR: ", error);
      process.exit(1);
   }
};
