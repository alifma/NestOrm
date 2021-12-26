import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  createUser(@Body() body:CreateUserDTO) {
    return this.usersService.createUser(body)
  }

  @Get()
  getAll() {
    return this.usersService.getAll()
  }
}
