import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/modules/users/modules/auth/roles/roles.enum';
import { IUserPublic } from './user.interfaces';

@ObjectType({ description: 'user' })
export class UserEntity implements IUserPublic {
  @Field((type) => ID)
  userId: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field((type) => [String])
  roles: Role[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
