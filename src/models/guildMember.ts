import { prop, Ref, index, DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { Guild } from "./guild";
import { User } from "./user";
import { Profile } from "./profile";
import { GuildModel, UserModel, ProfileModel } from "../db";

@index({ guild: 1, user: 1 }, { unique: true })
export class GuildMember {
  @prop({ ref: () => Guild, required: true })
  public guild!: Ref<Guild>;
  
  @prop({ ref: () => User, required: true })
  public user!: Ref<User>;

  @prop({ ref: () => Profile, required: true })
  public profile!: Ref<Profile>;

  public async getProfile(this: DocumentType<GuildMember>) {
    if (!this.profile) return undefined;
    return await ProfileModel.findById(this.profile);
  }

  public static async findOrCreate(
    this: ReturnModelType<typeof GuildMember>,
    guildId: string,
    userId: string
  ) {
    const guild = await GuildModel.findOrCreate(guildId);
    const user = await UserModel.findOrCreate(userId);

    if (!guild || !user) return undefined;

    let member = await this.findOne({guild, user});

    if (!member) {
      const profile = await ProfileModel.create({});
      member = await this.create({
        user: user,
        guild: guild,
        profile: profile,
      });
    }

    return member;
  }
}