const { Queue } = require("bullmq");


const notificationQueue = new Queue("email-queue");

async function init() {
  const result = await notificationQueue.add("email to sandesh", {
    email: "sandeshjadhwani@gmail.com",
    subject: "Welcome msg",
    body: "Hey Sandesh Kumar",
  });
  console.log("Job added to queue",result.id);

}

init();