import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { CreateUserDTO, ListUserDTO } from 'src/dto/users.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async GetAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<StandardResponseDTO> {
    return await this.usersService.getAll(page, limit, sort);
  }

  @Get(':id')
  async GetDetail(@Param('id') id: number): Promise<ListUserDTO> {
    return await this.usersService.getOneById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  async DeleteData(@Param('id') id: number): Promise<ExecResponseDTO> {
    return this.usersService.delete(id);
  }
}
