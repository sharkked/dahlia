import { prop, Ref, getModelForClass } from "@typegoose/typegoose";

// Schema
export class Guild {
  @prop({ index: true, unique: true, required: true })
  public id!: string;

  @prop()
  public name?: string;

  @prop({ ref: () => User })
  public users!: Ref<User>[];
}

export class User {
  @prop({ index: true, unique: true, required: true })
  public id!: string;

  @prop({ ref: () => Guild })
  public guilds!: Ref<User>[];
}

// Models

export const GuildModel = getModelForClass(Guild, {
  schemaOptions: {
    timestamps: true,
  },
});

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

// Functions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nullToUndefined(item: any) {
  return item === null ? undefined : item;
}

export type FindGuild = (
  guildId: string,
  fields?: string
) => Promise<Guild | undefined>;

export const findGuild: FindGuild = (guildId, fields) =>
  GuildModel.findOne({ id: guildId }, fields).exec().then(nullToUndefined);
