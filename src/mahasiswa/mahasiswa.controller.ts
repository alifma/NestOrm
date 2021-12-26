import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DetailMahasiswaDTO, UpdateMahasiswaDTO } from 'src/dto/mahasiswa.dto';
import { ExecResponseDTO, StandardResponseDTO } from 'src/dto/standard-response.dto';
import { Mahasiswa } from 'src/entity/mahasiswa.entity';
import { MahasiswaService } from './mahasiswa.service';

@UseGuards(JwtAuthGuard)
@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}
  
  @Get()
  async GetAll(
    @Query('page') page:number,
    @Query('limit') limit:number,
    @Query('sort') sort:string
    ): Promise<StandardResponseDTO> {
    const responseGetMhsw = await this.mahasiswaService.getAll(limit, page, sort);
    return responseGetMhsw
  }

  @Get(':id')
  async GetDetail(@Param('id') id :number): Promise<DetailMahasiswaDTO> {
    return await this.mahasiswaService.getDetailed(id);
  }

  @Post()
  CreateNew(@Body() createMhsDTO: Mahasiswa): ExecResponseDTO {
    return this.mahasiswaService.create(createMhsDTO)
  }

  @Delete(':id')
  async DeleteData(@Param('id') id: number): Promise<ExecResponseDTO> {
    return  this.mahasiswaService.delete(id);
  }

  @Put(':id')
  Update(@Param('id') id :number, @Body() createMhsDTO: UpdateMahasiswaDTO): Promise<ExecResponseDTO> {
    return this.mahasiswaService.update(id, createMhsDTO)
  }
}
