import { Injectable, UseGuards } from '@nestjs/common';
import { ICreatePostInputFull } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { GqlAuthGuard } from '../users/modules/auth/gql-auth.quard';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(payload: ICreatePostInputFull): Promise<Post> {
    const post = new this.postModel({ ...payload });
    return post.save();
  }

  async findOne(postId: string): Promise<Post> {
    const post = await this.postModel.findOne({ postId });
    return post;
  }

  async findAll(): Promise<any[]> {
    return this.postModel
      .find()
      .populate('user', 'userId username email roles')
      .exec();
  }
  @UseGuards(GqlAuthGuard)
  async update(
    postId: string,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { postId },
      {
        ...updatePostInput,
      },
      { new: true },
    );
    return updatedPost;
  }

  @UseGuards(GqlAuthGuard)
  async remove(postId: string): Promise<boolean> {
    const res = await this.postModel.deleteOne({ postId });
    return res?.deletedCount > 0;
  }
}
