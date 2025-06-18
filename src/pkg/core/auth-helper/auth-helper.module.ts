import { Module } from '@nestjs/common';

import { JwtGuard } from '@/pkg/core/auth-helper/jwt.guard';

@Module({
  providers: [JwtGuard],
  exports: [JwtGuard],
})
export class AuthHelperModule {}
