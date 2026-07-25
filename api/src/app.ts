import express, { Express } from "express";
import campaignRouter from "./routes/campaign.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express();

app.use(express.json());
app.use('/campaigns', campaignRouter)
app.use(errorHandler)

export { app };
