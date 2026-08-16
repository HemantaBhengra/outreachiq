import { config as dotenvConfig} from "dotenv";
import { z } from "zod";

dotenvConfig();

const configSchema = z.object({
    PORT: z.string().transform(Number),
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string()
})


const config = configSchema.parse(process.env)

export default config