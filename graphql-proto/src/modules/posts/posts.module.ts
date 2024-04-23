import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { UsersModule } from '../users/users.module';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostsResolver, PostsService, PostsRepository],
})
export class PostsModule {}
