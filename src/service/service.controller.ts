import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  CreateServiceDTO,
  ItemDetailServiceDTO,
  UpdateServiceDTO,
} from 'src/dto/service.dto';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { ServiceService } from './service.service';

@UseGuards(JwtAuthGuard)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async GetAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<StandardResponseDTO> {
    return await this.serviceService.getAll(limit, page, sort);
  }

  @Get(':id')
  async GetDetail(@Param('id') id: number): Promise<ItemDetailServiceDTO> {
    return await this.serviceService.getOneById(id);
  }

  @Post()
  CreateNew(@Body() body: CreateServiceDTO): ExecResponseDTO {
    return this.serviceService.create(body);
  }

  @Delete(':id')
  async DeleteData(@Param('id') id: number): Promise<ExecResponseDTO> {
    return this.serviceService.delete(id);
  }

  @Put(':id')
  Update(
    @Param('id') id: number,
    @Body() body: UpdateServiceDTO,
  ): Promise<ExecResponseDTO> {
    return this.serviceService.update(id, body);
  }
}
