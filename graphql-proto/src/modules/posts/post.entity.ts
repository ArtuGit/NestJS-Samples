import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../users/user.entity';

@ObjectType()
export class PostEntity {
  @Field((type) => ID)
  postId: string;

  @Field((type) => UserEntity)
  user: UserEntity;

  @Field({ description: `Text content` })
  content: string;

  @Field((type) => [String], { nullable: 'items' })
  labels: string[];

  @Field((type) => Int, { nullable: false })
  likes: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
