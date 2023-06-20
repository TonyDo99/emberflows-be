import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export interface IWeb {
  id: number;
  name: string;
  price: string;
}

@Schema({ timestamps: true, validateBeforeSave: true })
export class User {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: mongoose.Schema.Types.Array,
    default: [],
  })
  bookWebs: IWeb[];

  @Prop({
    type: mongoose.Schema.Types.Date,
    default: now(),
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    default: now(),
  })
  updatedAt: Date;

  @Prop()
  deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
