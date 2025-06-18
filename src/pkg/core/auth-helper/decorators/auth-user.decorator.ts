import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import type { TAuthUser } from '@/pkg/core/auth-helper/types';

export const AuthUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): TAuthUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
