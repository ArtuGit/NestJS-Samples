import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsOptional, IsString, Validate } from 'class-validator';
import { IsValidMongoObjectId } from 'src/graphql/validation/is-valid-mongo-object-id.validation';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field((type) => ID)
  @Validate(IsValidMongoObjectId)
  postId: string;

  @Field({ description: `Text content` })
  @IsString()
  content: string;

  @Field((type) => [String], { nullable: 'items' })
  @IsOptional()
  labels?: string[];
}
