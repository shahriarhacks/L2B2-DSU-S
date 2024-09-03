import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/global.error.handler";
import { notFound } from "./app/middlewares/not.found";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1", router);

// Global error handler
app.use(globalErrorHandler);

// Not found
app.use(notFound);

export default app;
