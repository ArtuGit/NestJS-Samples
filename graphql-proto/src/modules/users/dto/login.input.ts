import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(20)
  password: string;
}
