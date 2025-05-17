import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({
  timestamps: true,
})
export class Location {
  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: string;

  @Prop({ required: true, type: Number })
  lat1: number;

  @Prop({ required: true, type: Number })
  long1: number;

  @Prop({ required: true, type: Number })
  lat2: number;

  @Prop({ required: true, type: Number })
  long2: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
