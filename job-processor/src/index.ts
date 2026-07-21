import { startWorker } from "./worker";
import { emailQueue } from "./queue";
import { CreateJobInput, EmailSendJob } from "./jobs/emailSend";

const input1: CreateJobInput = {
  jobId: "job-1",
  campaignId: "campaign-1",
  email: "john@example.com",
  subject: "Hey John, quick question",
  template: "Hi John, I wanted to reach out...",
};
const job1: EmailSendJob = {
  ...input1,
  status: "pending",
  retries: 0,
  maxRetries: 3,
};

const input2: CreateJobInput = {
  jobId: "job-2",
  campaignId: "campaign-1",
  email: "sarah@example.com",
  subject: "Hey Sarah, quick question",
  template: "Hi Sarah, I wanted to reach out...",
};
const job2: EmailSendJob = {
  ...input2,
  status: "pending",
  retries: 0,
  maxRetries: 3,
};

const input3: CreateJobInput = {
  jobId: "job-3",
  campaignId: "campaign-1",
  email: "mike@example.com",
  subject: "Hey Mike, quick question",
  template: "Hi Mike, I wanted to reach out...",
};
const job3: EmailSendJob = {
  ...input3,
  status: "pending",
  retries: 0,
  maxRetries: 3,
};

emailQueue.enqueue(job1);
emailQueue.enqueue(job2);
emailQueue.enqueue(job3);
startWorker();
