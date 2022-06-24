import mongoose from "mongoose";
import { Client } from "discord.js";
import config from "./config";
import logger from "./tools/logger";
import { findOrCreateGuild } from "./utils/guildUtils";

mongoose.connect(config.db as string);

mongoose.connection
  .on('connected', () => logger.info(`Mongoose default connection open to ${config.db?.replace(/\/\/.*@/, "//<user>:<password>@")}`))
  .on('error', (err) => logger.info(`Mongoose default connection error: ${err}`))
  .on('disconnected', () => logger.info('Mongoose default connection disconnected'))

const client = new Client(config.opts);


client.once("ready", (c) => {
  logger.info(`Hiiii!! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const guild = await findOrCreateGuild(message.guildId);
  console.log(guild);
  if (client.user && message.mentions.has(client.user)) {
    message.reply("hiii");
  }
});

client.login(config.token);
