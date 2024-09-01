import app from "./app";
import { connectDB } from "./app/db/mongo";
import { Server } from "http";
import { env_config } from "./config/env.config";

let server: Server;

const runner = async () => {
   connectDB().catch((error) =>
      console.log(`MongoDB connection error: ${error}`),
   );

   server = app.listen(env_config.port, () => {
      console.log(
         `😉 Server is running on port ${env_config.port} in ${env_config.env} mode.`,
      );
   });

   app.on("error", (error) => {
      console.log(`Server failed to start with error: ${error}`);
      process.exit(1);
   });
};

process.on("unhandledRejection", (error) => {
   if (server) {
      server.close(() => {
         console.log(`Server closed due to ${error}`);
         process.exit(1);
      });
   } else {
      process.exit(1);
   }
});

runner();
