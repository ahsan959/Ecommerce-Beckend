const app = require("./app.js");

const dotenv = require("dotenv");
const PORT = 5000;

// Handling uncaught Exceptions for exampe console.log(youtube) error youtube is not defined
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`shutting down the server due to uncaughtException `);
  process.exit(1);
});

const ConnectDatabase = require("./config/Database.js");

// config
dotenv.config({ path: "beckend/config/config.env" });

// Connecting database make sure that it call after calling the dotenv file
ConnectDatabase();

const MyServer = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

// unhandled Promis Error
// ya error wo hota ha jahsa DB Name Wrong da dia is case may hum ko server Shutdown Karna ha
// unhandledRejection -->Event
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandled Promise Rejection `);

  MyServer.close(() => {
    process.exit(1);
  });
});
