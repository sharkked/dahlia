import { getModelForClass } from "@typegoose/typegoose";
import { Guild } from "./models/guild";
import { User } from "./models/user";
import { Profile } from "./models/profile";
import { GuildMember } from "./models/guildMember";

const opts = {
  schemaOptions: {
    timestamps: true,
  },
};

// Models

export const GuildModel = getModelForClass(Guild, { ...opts });
export const UserModel = getModelForClass(User, { ...opts });
export const ProfileModel = getModelForClass(Profile, { ...opts });
export const GuildMemberModel = getModelForClass(GuildMember, { ...opts });

// Functions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function nullToUndefined(item: any) {
  return item === null ? undefined : item;
}

export function findGuild(guildId: string, fields?: string): Promise<Guild | undefined> {
  return GuildModel.findOne({ id: guildId }, fields).exec().then(nullToUndefined);
}
  
export function findUser(userId: string, fields?: string): Promise<User | undefined> {
  return UserModel.findOne({ id: userId }, fields).exec().then(nullToUndefined);
}

export function findGuildMember(
  guild: Guild,
  user: User,
  fields?: string
): Promise<GuildMember | undefined> {
  return GuildMemberModel.findOne({ guild: guild, user: user }, fields).exec().then(nullToUndefined);
}

export function findProfile(
  profile: Profile,
  fields?: string
): Promise<Profile | undefined> {
  return ProfileModel.findById(profile, fields).exec().then(nullToUndefined);
}

export function findMemberGuilds(user: User): Promise<Guild[] | undefined> {
  return GuildMemberModel.find({ user: user }, "guild").exec().then(nullToUndefined);
}

export function findGuildUsers(guild: Guild): Promise<User[] | undefined> {
  return GuildMemberModel.find({ guild: guild }, "user").exec().then(nullToUndefined);
}