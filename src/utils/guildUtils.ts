import { Guild, findGuild, GuildModel, User } from "../db";

export async function findOrCreateGuild(
  guildId: string | null
): Promise<Guild | undefined> {
  if (guildId === null) return undefined;

  let guild = await findGuild(guildId);

  if (!guild) {
    guild = await createGuild(guildId);
  }

  return guild;
}

export async function assignGuild(user: User | undefined, guildId: Guild) {
  console.log(user);
}

export async function createGuild(guildId: string): Promise<Guild | undefined> {
  const guild = await GuildModel.create({
    id: guildId,
  });

  return guild;
}
