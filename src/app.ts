import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { Client } from "discord.js";
import config from "./config";
import logger from "./tools/logger";

mongoose.connect(config.db as string);

mongoose.connection
  .on('connected', () => logger.info(`Mongooose: default connection open to ${config.db?.replace(/\/\/.*@/, "//<user>:<password>@")}`))
  .on('error', (err) => logger.info(`Mongoose: default connection error: ${err}`))
  .on('disconnected', () => logger.info('Mongoose: default connection disconnected'))

const client = new Client(config.opts);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.match(/\.(t|j)s$/));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
  import(filePath).then(({ default: event }) => {
    logger.info("Event: loaded " + event.name);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
}

client.login(config.token);
