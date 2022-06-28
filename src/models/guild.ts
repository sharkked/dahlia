import { prop, ReturnModelType } from "@typegoose/typegoose";

export class Guild {
  @prop({ index: true, unique: true, required: true })
  public id!: string;

  @prop()
  public name?: string;

  public static async findOrCreate(
    this: ReturnModelType<typeof Guild>,
    guildId: string | null
  ) {
    if (guildId === null) return undefined;
  
    let guild = await this.findOne({ id: guildId });
  
    if (!guild) {
      guild = await this.create({
        id: guildId,
      });
    }
  
    return guild;
  }  
}
