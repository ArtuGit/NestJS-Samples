import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field({ description: `Text content` })
  content: string;

  @Field((type) => [String], { nullable: 'items' })
  @IsOptional()
  labels?: string[];
}

export interface ICreatePostInputFull extends CreatePostInput {
  userId: string;
}
