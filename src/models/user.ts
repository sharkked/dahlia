import { prop, ReturnModelType } from "@typegoose/typegoose";

export class User {
  @prop({ index: true, unique: true, required: true })
  public id!: string;

  public static async findOrCreate(
    this: ReturnModelType<typeof User>,
    userId?: string | null
  ) {
    if (!userId) return undefined;

    let user = await this.findOne({id: userId});
  
    if (!user) {
      user = await this.create({
        id: userId,
      });
    }
  
    return user;
  }
}