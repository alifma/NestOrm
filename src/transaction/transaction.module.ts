import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entity/transaction.entity';
import { Wallet } from 'src/entity/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Wallet]), TransactionModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
