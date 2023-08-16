import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    await req.user.populate('posts')
    return req.user.posts;
  }
}