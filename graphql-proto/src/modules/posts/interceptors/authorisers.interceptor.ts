import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersRepository } from '../../users/users.repository';
import { findObjPropOnAnyLevel } from '../../../utils/findObjPropOnAnyLevel';
import { PostsRepository } from '../posts.repository';

@Injectable()
export class CanManagePostsInterceptor implements NestInterceptor {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    let user = request.user;
    user = await this.usersRepository.findOneByUserId(user.userId);
    if (!user) throw new NotFoundException(`User not found`);

    const postId = findObjPropOnAnyLevel(ctx.getArgs(), 'postId');

    const post = await this.postsRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with postId=${postId} is not found`);
    }

    if (post.userId !== user.userId && user.roles.includes('user')) {
      throw new UnauthorizedException(
        `User is not authorized to manage this post`,
      );
    }

    return next.handle();
  }
}
