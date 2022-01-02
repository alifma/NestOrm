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
  createDosenDTO,
  ItemDetailDosenDTO,
  UpdateDosenDTO,
} from 'src/dto/dosen.dto';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { DosenService } from './dosen.service';

@UseGuards(JwtAuthGuard)
@Controller('dosen')
export class DosenController {
  constructor(private readonly dosenService: DosenService) {}

  @Get()
  async GetAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<StandardResponseDTO> {
    return await this.dosenService.getAll(limit, page, sort);
  }

  @Get(':id')
  async GetDetail(@Param('id') id: number): Promise<ItemDetailDosenDTO> {
    return await this.dosenService.getOneById(id);
  }

  @Post()
  CreateNew(@Body() body: createDosenDTO): ExecResponseDTO {
    return this.dosenService.create(body);
  }

  @Delete(':id')
  async DeleteData(@Param('id') id: number): Promise<ExecResponseDTO> {
    return this.dosenService.delete(id);
  }

  @Put(':id')
  Update(
    @Param('id') id: number,
    @Body() body: UpdateDosenDTO,
  ): Promise<ExecResponseDTO> {
    return this.dosenService.update(id, body);
  }
}
