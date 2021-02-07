require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const logger = require("morgan");
const fs = require("fs");

const licenses = require("./licenses.json");

const { PORT } = process.env;
const RESPONSE_STORE = {};

const app = express();
const server = http.createServer(app);
// noinspection JSValidateTypes
const io = socket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("combined"));

io.on("connection", (socket) => {
  console.log("a user connected ..");
  socket.on("disconnect", () => {
    console.log("user disconnected ..");
  });
  socket.on("response", (data) => {
    const { time, "content-type": resType, body } = data;
    console.log("response", time);
    if (RESPONSE_STORE[time]) {
      if (resType.includes("json")) RESPONSE_STORE[time].json(body);
      else RESPONSE_STORE[time].send(body);
      delete RESPONSE_STORE[time];
    }
  });
});

app.post("/ngrok-admin/register", (req, res) => {
  const { license } = req.body;
  if (licenses.includes(license))
    return res.json({ code: 200, status: "Already Exist", data: { license } });
  licenses.push(license);
  fs.writeFileSync("./licenses.json", licenses);
  res.json({ code: 200, status: "OK", data: { license } });
});
app.use("/", (req, res) => {
  const { method, headers, url: path, body } = req;
  const { license } = headers;
  const time = new Date().getTime();
  if (!license)
    return res.json({
      code: 401,
      status: "Unauthorized",
      data: { message: "license is required in request headers" },
    });
  if (!licenses.includes(license))
    return res.json({
      code: 401,
      status: "Unauthorized",
      data: { message: "license is not registered please contact admin" },
    });
  const data = {
    headers,
    body,
    path,
    time,
    method: method.toLowerCase(),
  };
  io.emit("request", data);
  RESPONSE_STORE[data.time] = res;
});

server.listen(PORT || "8080", () => {
  console.log(`Server running on port ${PORT || 8080}!`);
});
