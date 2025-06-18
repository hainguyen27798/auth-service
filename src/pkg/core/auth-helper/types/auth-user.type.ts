import type { SocialProvider, UserRoles } from '@/pkg/core/auth-helper/constants';

export type JwtPayload = {
  id: string;
  role: UserRoles;
  email: string;
  provider?: SocialProvider;
};

export type TAuthUser = JwtPayload & {
  jit: string;
};
