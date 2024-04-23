import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../users/user.schema.';

@Schema({ timestamps: true })
export class Post {
  @Prop()
  _id: string;

  @Prop({
    unique: true,
    index: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  })
  postId: string;

  @Prop({ index: true, type: String, ref: 'User' })
  userId: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ index: true })
  labels: string[];

  @Prop({ index: true, default: 0 })
  likes: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre<Post>('save', function (next) {
  if (this.postId && !this._id) {
    this._id = this.postId;
  }
  next();
});

PostSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});
