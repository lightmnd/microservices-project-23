const cron = require("node-cron");
const { exec } = require("child_process");

// Schedule your npm script to run every day at 3:30 PM
cron.schedule("*/15 * * * * *", () => {
  console.log("Running the task every 15 seconds");

  // Replace "npm start" with your actual npm script command
  exec("npm start", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});
