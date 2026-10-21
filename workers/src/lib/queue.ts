import Queue from "bull";
import { redis } from "./redis";

// Email job Queue 
export const emailQueue = new Queue("emails",{
    redis:{
        host:"localhost",
        port:6379,
    }
})

// Campaing job queue
export const campaignQueue = new Queue("campaigns",{
    redis:{
        host:"localhost",
        port:6379,
    }
})

export default {emailQueue,campaignQueue}