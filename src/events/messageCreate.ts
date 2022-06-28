import { Message } from "discord.js";
import { ProfileModel, GuildMemberModel } from "../db";

export default {
  name: "messageCreate",
  async execute(message: Message) {
		if (message.author.bot || !message.guild) return;
    const member = await GuildMemberModel.findOrCreate(message.guildId ?? "", message.author.id);
    if (!member) return;
    
    let profile = await member.getProfile();
    if (!profile) {
      profile = await ProfileModel.create({});
      member.profile = profile;
      member.save();
    }
    profile.addPoints(1);

    if (message.client.user && message.mentions.has(message.client.user)) {
      message.reply(profile ? `${profile.points}` : "hiiiii :)");
    }
  }
}