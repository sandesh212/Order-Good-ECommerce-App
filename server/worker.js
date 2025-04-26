const { Worker, RedisConnection } = require("bullmq");

const sendEmail = () => new Promise((resolve, reject) => {
  
    setTimeout(() => resolve(), 5000);
});

const worker = new Worker("email-queue", async (job) => {
    try {
        console.log(`Message received id ${job.id}`);
        console.log("Processing message");
        console.log(`Sending email to ${job.data.email}`);

        await sendEmail();
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error processing job:", error);
    }
},{connection:{
    host: "127.0.0.1",
    port: 6379
}});

worker.on("error", (error) => {
    console.error("Worker error:", error);
});

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
    console.error(`Job ${job.id} failed with error:`, error);
});
