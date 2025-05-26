import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema({ timestamps: true })
export class User extends Document {
  declare _id: string;
  // @Transform(({ value }) => value.toString())
  // _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ required: true })
  role: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  refreshToken?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

UserSchema.index({ role: 1 });
UserSchema.index({ email: 1, isActive: 1 });
