import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const _config = {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   mongo_uri: process.env.MONGO_URI,
};

export const env_config = Object.freeze(_config);
