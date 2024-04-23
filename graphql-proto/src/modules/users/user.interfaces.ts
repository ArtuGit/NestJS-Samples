import { Role } from './modules/auth/roles/roles.enum';

export interface IUser {
  userId: string;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}
export type IUserPublic = Omit<
  IUser,
  'password' | 'roles' | 'createdAt' | 'updatedAt'
>;

export type IUserInJwt = Omit<IUserPublic, 'email'>;

export type IUserPublicPartial = Partial<IUserPublic>;
