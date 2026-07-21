import { EmailSendJob } from "./jobs/emailSend";
import { emailQueue } from "./queue";

async function processJob(job: EmailSendJob): Promise<void> {
  try {
    job.status = "processing";
    console.log(`processing email to: ${job.email} status: ${job.status} `);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //testing
    if (Math.random() < 0.5) {
      throw new Error("Email server unavailable");
    }

    job.status = "done";
    console.log(`Email sent to: ${job.email} status: ${job.status}`);
  } catch (error) {
    if (job.retries < job.maxRetries) {
      job.retries++;
      const incrTime = 2 ** job.retries * 1000;
      console.log(
        `Retrying job ${job.email} in ${incrTime}ms (attempt: ${job.retries}/${job.maxRetries}`,
      );
      await new Promise((resolve) => setTimeout(resolve, incrTime));
      await processJob(job);
    } else {
      job.status = "failed";
      console.log(`Email ${job.email} status: ${job.status}`);
    }
  }
}

async function startWorker() {
  while (true) {
    if (emailQueue.size() > 0) {
      const jobs = [];

      for (let i = 0; i < 3; i++) {
        const job = emailQueue.dequeue();
        if(job){
          jobs.push(job);
        }
      }
      if (jobs.length > 0) {
        await Promise.all(jobs.map((job) => processJob(job)));
      }
    } else {
      console.log(`Queue empty, waiting...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

export { startWorker };
