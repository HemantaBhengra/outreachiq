import { app } from "./app";
import { redis } from "./lib/redis";
import config from "./config/config";

const startServer = async () => {
  try {

    await redis.connect()
    console.log("Redis connected")

    app.listen(config.PORT, () => {
      console.log(
        `Server running on port ${config.PORT} in ${config.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

startServer()