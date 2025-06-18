import { ExecutionContext, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { PERMISSION_KEY, UserRoles } from '@/pkg/core/auth-helper/constants';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private _Reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any, _info: any, context: ExecutionContext) {
    if (err) {
      throw err;
    }

    // get roles required
    const roles = this._Reflector.getAllAndOverride<UserRoles>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const hasPermission = roles.includes(user?.role);

    Logger.log(`Current role: ${user.role}`, 'JwtGuard');
    Logger.log(`Required roles: ${roles}`, 'JwtGuard');

    if (!hasPermission) {
      Logger.error(_info.message, _info.stack, 'JwtGuard');
      throw err || new ForbiddenException(_info.message);
    }
    return user;
  }
}
