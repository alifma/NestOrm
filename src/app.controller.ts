import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: any): any {
    return this.authService.login(req.user);
  } 

  @Get()
  helloWorld():{status: boolean, desc: string} {
    return {status: true, desc: "deployed"}
  }
}
