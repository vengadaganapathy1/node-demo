const express = require("express");
const config = require("config");
const custom = require("./middleware/custom-middleware");
const helmet = require("helmet");
const morgan = require("morgan");
const startUpDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require("./routes/genres");
const app = express();

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/home", home);
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
// How to set port
// set PORT=5000

const environment = process.env.NODE_ENV;
console.log(`Env is ${environment}`); // undefined
console.log(app.get("env")); // default to development even if it not set

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});

// in built middleware
app.use(express.json());
// Read the request and parse the body of the request into json object
app.use(express.urlencoded({ extended: true }));
// url encoded request body can be sent to API
app.use(express.static("public"));

// Custom middleware
app.use(custom.log);
app.use(custom.authenticate);

// Configuration
console.log(`Application name:` + config.get("name"));
console.log(`Mail server:` + config.get("mail.host"));
console.log(`Mail password:` + config.get("mail.password"));

// Third party middleware
// helmet
// Set env as => set NODE_ENV=production
if (app.get("env") === "development") {
  app.use(helmet());
  startUpDebugger("Morgan enabled...");
  dbDebugger("Debugger enabled");
  app.use(morgan("tiny"));
}
