import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostInput } from './dto/update-post.input';
import { PostEntity } from './post.entity';
import { UsersRepository } from '../users/users.repository';
import { PostsRepository } from './posts.repository';
import { ICreatePostInputFull } from './dto/create-post.input';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async create(payload: ICreatePostInputFull): Promise<PostEntity> {
    const user = await this.usersRepository.findOneByUserId(payload.userId);
    if (!user) {
      throw new NotFoundException(`User userId=${payload.userId} is not found`);
    }

    const post = await this.postsRepository.create({ ...payload });
    return {
      ...post['_doc'],
      user: { ...user['_doc'] },
    };
  }

  async findOne(postId: string): Promise<PostEntity> {
    const post = await this.postsRepository.findOne(postId);
    if (!post) return null;
    const user = await this.usersRepository.findOneByUserId(post.userId);
    return {
      ...post['_doc'],
      user: { ...user['_doc'] },
    };
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.findAll();
  }

  async update(
    postId: string,
    updatePostInput: UpdatePostInput,
  ): Promise<PostEntity> {
    const updatedPost = await this.postsRepository.update(
      postId,
      updatePostInput,
    );
    if (!updatedPost) return null;
    const user = await this.usersRepository.findOneByUserId(updatedPost.userId);
    return { ...updatedPost['_doc'], user: user['_doc'] };
  }

  async remove(postId: string): Promise<boolean> {
    return this.postsRepository.remove(postId);
  }
}
