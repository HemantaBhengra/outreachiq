import { emailQueue } from "./lib/queue";

async function main() {
  const job = await emailQueue.add({
    email: "",
    campaignId: "campaign-001",
    subject: "First worker test",
    body: "Testing the OutreachIQ email worker",
  });

  console.log("Email job added:", job.id);
}

main().catch(console.error);
