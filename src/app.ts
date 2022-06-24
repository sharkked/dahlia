import fs from "fs";
import mongoose from "mongoose";
import { Client } from "discord.js";
import config from "./config";
import logger from "./tools/logger";

console.log(fs);

mongoose.connect(config.db)

// mongoose.connection
//   .on('connected', () => logger.info(`Mongoose default connection open to ${config.db}`))
//   .on('error', (err) => logger.info(`Mongoose default connection error: ${err}`))
//   .on('disconnected', () => logger.info('Mongoose default connection disconnected'))

const client = new Client(config.opts);

client.once("ready", (c) => {
  logger.info(`Hiiii!! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (client.user && message.mentions.has(client.user)) {
    message.reply("hiii");
  }
});

client.login(config.token);
