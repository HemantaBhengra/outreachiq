import { createClient } from "redis";

const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export { redis };
