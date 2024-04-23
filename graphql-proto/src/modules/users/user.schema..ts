import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser } from './user.interfaces';
import { Role } from './modules/auth/roles/roles.enum';

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop()
  _id: string;

  @Prop({
    unique: true,
    index: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  })
  userId: string;

  @Prop({ lowercase: true, trim: true, required: true })
  username: string;

  @Prop({ lowercase: true, trim: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, index: true, default: [Role.User] })
  roles: Role[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next) {
  if (this.userId && !this._id) {
    this._id = this.userId;
  }
  next();
});
