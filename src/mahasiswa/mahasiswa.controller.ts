import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExecResponseDTO, StandardResponseDTO } from 'src/dto/standard-response.dto';
import { Mahasiswa } from 'src/entity/mahasiswa.entity';
import { MahasiswaService } from './mahasiswa.service';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}
  
  @Get()
  async GetAll(): Promise<StandardResponseDTO> {
    const responseGetMhsw = await this.mahasiswaService.getAll();
    const response:StandardResponseDTO = {
      total_pages: 0,
      per_page: 0,
      page: 0,
      total_data: responseGetMhsw[1],
      list: responseGetMhsw[0]
    } 
    return response
  }

  @Get(':id')
  async GetDetail(@Param('id') id :number): Promise<Mahasiswa> {
    const responseGetMhsw = await this.mahasiswaService.getDetail(id);
    return responseGetMhsw
  }

  @Post()
  CreateNew(@Body() createMhsDTO: Mahasiswa): ExecResponseDTO {
    return this.mahasiswaService.create(createMhsDTO)
  }
}
