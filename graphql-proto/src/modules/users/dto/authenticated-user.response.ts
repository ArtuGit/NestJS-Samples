import { UserEntity } from '../user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'auth token' })
class AuthToken {
  @Field()
  type: string;

  @Field()
  token: string;
}

@ObjectType({ description: 'authenticated user' })
export class AuthenticatedUserResponse {
  @Field((type) => UserEntity)
  user: UserEntity;

  @Field()
  auth: AuthToken;
}
