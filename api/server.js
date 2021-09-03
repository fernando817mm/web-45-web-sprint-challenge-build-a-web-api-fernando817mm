const express = require("express");
const server = express();
const morgan = require("morgan");

// const actionsRouter = require("");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get("*", (req, res) => {
  res.send(`
    <h1>Fernando Martinez Sprint Challenge</h1>
  `);
});

module.exports = server;
