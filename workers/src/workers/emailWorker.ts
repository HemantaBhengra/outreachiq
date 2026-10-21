import { emailQueue } from "../lib/queue";

emailQueue.process(async (job)=>{
    const {email,campaignId,subject,body} = job.data;
    if (!email || !campaignId || !subject || !body){
        throw new Error("Invalid email data");
    }

    await new Promise(resolve => setTimeout(resolve,1000))
    return({success:true,email,campaignId})

})

emailQueue.on('completed',(job,result)=>{
    console.log(`completed:job.id`,job.id,result)
})

emailQueue.on('failed',(job,err)=>{
    console.log(`failed:`,job?.id,err?.message)
})