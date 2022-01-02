import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isQual = await bcrypt.compare(password, user.password);
    if (user && isQual) {
      const { password, username, ...rest } = user;
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      success: true,
      token: this.jwtService.sign(payload),
    };
  }
}
