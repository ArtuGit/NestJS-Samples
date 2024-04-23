import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersRepository } from '../../users/users.repository';
import { findObjPropOnAnyLevel } from '../../../utils/findObjPropOnAnyLevel';
import { PostsRepository } from '../posts.repository';

@Injectable()
export class CanManagePostsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersRepository: UsersRepository,
    private readonly postsRepository: PostsRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    let user = request.user;
    user = await this.usersRepository.findOneByUserId(user.userId);
    if (!user) return false;

    const postId = findObjPropOnAnyLevel(ctx.getArgs(), 'postId');

    const post = await this.postsRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with postId=${postId} is not found`);
    }

    if (post.userId !== user.userId && user.roles.includes('user')) {
      return false;
    }

    return true;
  }
}
