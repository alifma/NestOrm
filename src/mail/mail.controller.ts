import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NewSerahTerimaDTO, PrintSerahTerimaDTO } from 'src/dto/mail.dto';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async GetAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('type') type: string,
  ): Promise<StandardResponseDTO> {
    const responseGetMhsw = await this.mailService.getAll(
      limit,
      page,
      sort,
      type,
    );
    return responseGetMhsw;
  }

  @Get('/serahterima/:id')
  async GetDetail(@Param('id') id: number): Promise<PrintSerahTerimaDTO> {
    return await this.mailService.printSerahTerima(id);
  }

  @Get('/get')
  async GenId(): Promise<number> {
    return await this.mailService.getLastId();
  }

  @Post()
  async CreateMail(@Body() body: NewSerahTerimaDTO): Promise<ExecResponseDTO> {
    return this.mailService.createSerahTerima(body);
  }
}
