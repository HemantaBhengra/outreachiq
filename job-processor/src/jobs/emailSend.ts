export type EmailStatus = "pending" | "processing" | "done" | "failed";
export interface EmailSendJob {
  jobId: string;
  campaignId: string;
  email: string;
  subject: string;
  template: string;
  status: EmailStatus;
  retries: number;
  maxRetries: number;
}

export type UpdateJobInput = Partial<EmailSendJob>
export type JobSummary = Pick<EmailSendJob, 'jobId' | 'email' | 'status'>
export type CreateJobInput = Omit<EmailSendJob,'status' | 'retries' | 'maxRetries'>