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
import { CreateTransactionDTO } from 'src/dto/transaction.dto';
import { Transaction, TransactionType } from 'src/entity/transaction.entity';
import { TransactionService } from './transaction.service';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async GetAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<StandardResponseDTO> {
    return await this.transactionService.getAll(limit, page, sort, '');
  }

  @Get('/in')
  async GetAllIn(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<StandardResponseDTO> {
    return await this.transactionService.getAll(
      limit,
      page,
      sort,
      TransactionType.in,
    );
  }

  @Get('/out')
  async GetAllOut(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<StandardResponseDTO> {
    return await this.transactionService.getAll(
      limit,
      page,
      sort,
      TransactionType.out,
    );
  }

  @Get(':id')
  async GetDetail(@Param('id') id: number): Promise<Transaction> {
    return await this.transactionService.getOneById(id);
  }

  @Post('/in')
  async CreateNewIn(
    @Body() body: CreateTransactionDTO,
  ): Promise<ExecResponseDTO> {
    return this.transactionService.create(body, TransactionType.in);
  }

  @Post('/out')
  async CreateNewOut(
    @Body() body: CreateTransactionDTO,
  ): Promise<ExecResponseDTO> {
    return this.transactionService.create(body, TransactionType.out);
  }

  @Delete(':id')
  async DeleteData(@Param('id') id: number): Promise<ExecResponseDTO> {
    return this.transactionService.delete(id);
  }
}
