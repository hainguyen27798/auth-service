import type { SocialProvider, UserRoles } from '@/pkg/core/auth-helper';

export type UserInfoType = {
  name: string;
  email: string;
  password: string;
  role?: UserRoles;
};

export type SocialUserInfoType = Omit<UserInfoType, 'password' | 'role'> & {
  provider: SocialProvider;
  image: string;
};
