import dotenv from "dotenv";
import { Intents } from "discord.js";
import config from "../config.json";

dotenv.config();

export default {
  ...config,
  token: process.env.CLIENT_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  db: process.env.MONGODB_URI,
  opts: {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  },
};
