import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field()
  @MaxLength(20)
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(20)
  password: string;
}
