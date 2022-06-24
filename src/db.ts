import { prop, Ref, getModelForClass } from "@typegoose/typegoose";

class Guild {
  @prop({ index: true, unique: true, required: true })
  public id!: string;

  @prop({ ref: () => User })
  public users: Ref<User>[];
}

class User {
  @prop({ index: true, unique: true, required: true })
  public id!: string;

  @prop({ ref: () => Guild })
  public guilds: Ref<User>[];
}

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
