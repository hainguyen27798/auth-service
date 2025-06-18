import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import type { UserRoles } from '@/pkg/core/auth-helper/constants';
import { PERMISSION_KEY } from '@/pkg/core/auth-helper/constants';
import { JwtGuard } from '@/pkg/core/auth-helper/jwt.guard';

export const Auth = (...roles: UserRoles[]) =>
  applyDecorators(SetMetadata(PERMISSION_KEY, roles), UseGuards(JwtGuard));
