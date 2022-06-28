import { prop, DocumentType, ReturnModelType } from "@typegoose/typegoose";

export class Profile {
  @prop({ default: 0 })
  public points!: number;

  public async addPoints(
    this: DocumentType<Profile>, 
    points: number
  ) {
    this.points += points;
    await this.save();
  }

  public static async findOrCreate(
    this: ReturnModelType<typeof Profile>,
    profileId?: Profile | undefined
  ) {
    if (!profileId) return undefined;

    let profile = await this.findById(profileId);
  
    if (!profile) {
      profile = await this.create({
        
      });
    }
  
    return profile;
  }
}