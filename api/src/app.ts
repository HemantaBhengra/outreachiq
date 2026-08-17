import express, { Express } from "express";
import campaignRouter from "./routes/campaign.routes";
import { errorHandler } from "./middlewares/error.middleware";
import leadRouter from "./routes/lead.routes";
import {rateLimit} from "./middlewares/rateLimit.middleware"
const app: Express = express();

app.use(express.json());
app.use(rateLimit)
app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})
app.use("/campaigns", campaignRouter);
app.use("/leads", leadRouter);
app.use(errorHandler);

export { app };
