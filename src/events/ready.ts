import { Client } from "discord.js";
import logger from "../tools/logger";

export default {
	name: 'ready',
	once: true,
	execute(client: Client) {
    logger.info(`Discord: Hiiii!! Logged in as ${client?.user?.tag ?? "nulluser"}`);
	},
};
