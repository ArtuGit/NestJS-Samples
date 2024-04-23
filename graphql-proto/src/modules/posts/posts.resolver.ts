import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '../users/modules/auth/gql-auth.quard';
import { CurrentUser } from '../users/modules/auth/current-user.decorator';
import { IUserInJwt } from '../users/user.interfaces';
import { RolesGuard } from '../users/modules/auth/roles/roles.guard';
import { Roles } from '../users/modules/auth/roles/roles.decorator';
import { Role } from '../users/modules/auth/roles/roles.enum';
import { CanManagePostsInterceptor } from './interceptors/authorisers.interceptor';
import ParseMongoObjectIdPipe from 'src/graphql/pipes/parse-mongo-object-id.pipe';

const pubSub = new PubSub();

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostEntity)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  async createPost(
    @CurrentUser() user: IUserInJwt,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostEntity> {
    const post = await this.postsService.create({
      ...createPostInput,
      userId: user.userId,
    });
    pubSub.publish('postAdded', { postAdded: post });
    return post as PostEntity;
  }

  @Query(() => [PostEntity], { name: 'posts' })
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Query(() => PostEntity, { name: 'post' })
  async findOne(
    @Args('postId', { type: () => String }, ParseMongoObjectIdPipe)
    postId: string,
  ): Promise<PostEntity> {
    return this.postsService.findOne(postId);
  }

  @Mutation(() => PostEntity)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UseInterceptors(CanManagePostsInterceptor)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<PostEntity> {
    return this.postsService.update(updatePostInput.postId, updatePostInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @UseInterceptors(CanManagePostsInterceptor)
  async removePost(
    @Args('postId', { type: () => String }, ParseMongoObjectIdPipe)
    postId: string,
  ): Promise<boolean> {
    return this.postsService.remove(postId);
  }

  @Subscription((returns) => PostEntity)
  async postAdded() {
    return pubSub.asyncIterator('postAdded');
  }
}
