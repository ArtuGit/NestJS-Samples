import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';
import { UsersRepository } from '../../../users.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersRepository: UsersRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    let user = ctx.getContext().req.user;
    user = await this.usersRepository.findOneByUserId(user.userId);
    if (!user) return false;

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
