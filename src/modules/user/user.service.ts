import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Configuration } from '@/configs';
import { User } from '@/modules/user/schemas/user.schema';
import { UserInfoType } from '@/modules/user/types';
import { UserRoles, UserStatus } from '@/pkg/core/auth-helper';
import { BcryptHelper } from '@/pkg/helpers';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private _UserModel: Model<User>) {}

  async createSuperUser() {
    const superuser = Configuration.instance.superuser;

    const currentSuperuser = await this._UserModel.findOne({
      role: UserRoles.SUPERUSER,
    });

    if (!currentSuperuser && superuser.email && superuser.pass) {
      await this.create({
        name: 'Super User',
        email: superuser.email,
        password: superuser.pass,
        role: UserRoles.SUPERUSER,
      });
    }
  }

  private async create(user: UserInfoType, verificationCode: string | null = null) {
    const password = user.password ? await BcryptHelper.hashPassword(user.password) : null;

    await this._UserModel.create({
      email: user.email,
      name: user.name,
      password,
      status: user.role === UserRoles.SUPERUSER ? UserStatus.ACTIVE : UserStatus.IN_ACTIVE,
      role: user.role,
      verificationCode,
    });
  }
}
