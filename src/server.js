//import express from "express";
import http from "http";
import { disconnect } from "process";
import WebSocket from "ws";
var tools = require('./loginCheck');

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/signin", (req, res) => res.render("signin"));
app.get("/loginCheck", (req, res) => loginCheck.logincheck());

//app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
//app.listen(port, handleListen);

const server = http.createServer(app); //http server
const wss = new WebSocket.Server({ server }); //web socket server

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✔");

  socket.on("close", () => {
    console.log("Disconnected from the Browser ❌");
  });
  socket.send("WELCOME to HYUNTAE's LIVE CHAT SYSTEM~~!");

  socket.on("message", (data) => {
    console.log("received: %s", data);

    wss.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        
        const message = data+"";
        client.send(message);
      }
    });
  });
});

server.listen(port, handleListen);
