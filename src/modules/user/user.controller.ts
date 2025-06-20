import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('me')
  async me() {
    return {
      message: 'Hello World!',
    };
  }
}
