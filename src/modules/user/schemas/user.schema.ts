import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { SocialProvider, UserRoles, UserStatus } from '@/pkg/core/auth-helper';
import { AbstractSchema } from '@/pkg/schemas';

const COLLECTION_NAME = 'users';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: COLLECTION_NAME, timestamps: true })
export class User extends AbstractSchema {
  @Prop({ maxlength: 150, trim: true })
  name: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.IN_ACTIVE })
  status: UserStatus;

  @Prop({ type: String, enum: SocialProvider })
  socialProvider: SocialProvider;

  @Prop()
  image: string;

  @Prop({ type: Boolean, default: false })
  verify: boolean;

  @Prop()
  verificationCode: string;

  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
