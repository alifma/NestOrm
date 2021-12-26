import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecResponseDTO } from 'src/dto/standard-response.dto';
import { CreateUserDTO, ListUserDTO } from 'src/dto/users.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAll():Promise<ListUserDTO[]> {
    return await this.usersService.getAll()
  }

  @Get(':id')
  async GetDetail(@Param('id') id :number): Promise<ListUserDTO> {
    return await this.usersService.getOneById(id);
  }

  @Post()
  createUser(@Body() body:CreateUserDTO) {
    return this.usersService.create(body)
  }

  @Delete(':id')
  async DeleteData(@Param('id') id: number): Promise<ExecResponseDTO> {
    return  this.usersService.delete(id);
  }
  
}
