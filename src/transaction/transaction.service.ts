import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { CreateTransactionDTO } from 'src/dto/transaction.dto';
import { UpdateWalletDTO } from 'src/dto/wallet.dto';
import { Transaction, TransactionType } from 'src/entity/transaction.entity';
import { Wallet } from 'src/entity/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
  ) {}

  async getAll(
    limit: number,
    page: number,
    sort: string,
    type: string,
  ): Promise<StandardResponseDTO> {
    const count: number = await this.getCount(type);
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 20;
    }
    if (
      !sort ||
      (sort.toUpperCase() !== 'ASC' && sort.toUpperCase() !== 'DESC')
    ) {
      sort = 'ASC';
    }
    let condition = {};
    if (type.length > 0) {
      condition = {
        tipe: type,
      };
    }
    const totalPage: number = Math.ceil(count / limit);
    try {
      const res = await this.transactionRepository
        .createQueryBuilder('tx')
        .leftJoinAndSelect('tx.service', 'service')
        .leftJoinAndSelect('tx.user', 'user')
        .where(condition)
        .select(['tx', 'user.nama', 'service.nama'])
        .getMany();
      return {
        total_pages: totalPage,
        per_page: limit,
        total_data: count,
        page: page,
        list: res,
      };
    } catch (err) {
      throw err;
    }
  }

  async getOneById(id: number): Promise<Transaction> {
    try {
      const user = await this.transactionRepository
        .createQueryBuilder('tx')
        .leftJoinAndSelect('tx.service', 'service')
        .leftJoinAndSelect('tx.user', 'user')
        .where({
          id: id,
        })
        .select(['tx', 'user.nama', 'service.nama'])
        .getOneOrFail();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(
    data: CreateTransactionDTO,
    type: string,
  ): Promise<ExecResponseDTO> {
    const currentWallet = await this.getWalletById(1);
    let transData: {};
    let finalSaldo = 0;
    if (type == 'in') {
      transData = {
        customer: data.customer,
        tipe: TransactionType.in,
        service: data.service,
        harga: data.harga,
        qty: data.qty,
        total: data.qty * data.harga,
        detail: data.detail,
        user: data.user,
        date: data.date,
        wallet: 1,
      };
      finalSaldo = currentWallet.saldo + data.qty * data.harga;
    } else {
      transData = {
        customer: data.customer,
        tipe: TransactionType.out,
        service: 7,
        harga: data.harga,
        qty: 1,
        total: data.harga,
        detail: data.detail,
        user: data.user,
        date: data.date,
        wallet: 1,
      };
      finalSaldo = currentWallet.saldo - data.qty * data.harga;
    }
    try {
      let newTrans = this.transactionRepository.create(transData);
      this.transactionRepository.save(newTrans);
      this.updateWallet(1, {
        saldo: finalSaldo,
      });
      return {
        status: true,
        description: `Transaction for ${data.customer} is created`,
      };
    } catch (error) {
      return {
        status: false,
        description: `Create transaction failed failed, ${error}`,
      };
    }
  }
  async delete(id: number): Promise<ExecResponseDTO> {
    const trans = await this.getOneById(id);
    if (trans) {
      try {
        const currentWallet = await this.getWalletById(1);
        let finalSaldo = 0;
        if (trans.tipe == 'in') {
          finalSaldo = currentWallet.saldo - trans.total;
        } else {
          finalSaldo = currentWallet.saldo + trans.total;
        }
        this.updateWallet(1, {
          saldo: finalSaldo,
        });
        this.transactionRepository.remove(trans);
        return {
          status: true,
          description: `Data ${trans.id} successfully deleted`,
        };
      } catch (error) {
        return {
          status: false,
          description: `Delete failed, can't find data`,
        };
      }
    } else {
      return {
        status: false,
        description: `Delete failed, can't find data`,
      };
    }
  }
  async getCount(type: string): Promise<number> {
    let condition = {};
    if (type.length > 0) {
      condition = {
        where: {
          tipe: type,
        },
      };
    }
    return await this.transactionRepository.count(condition);
  }

  async getWalletById(id: number): Promise<Wallet> {
    try {
      const wallet = await this.walletRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
      return wallet;
    } catch (error) {
      throw error;
    }
  }

  async updateWallet(id: number, data: UpdateWalletDTO): Promise<Wallet> {
    try {
      this.walletRepository
        .createQueryBuilder('mahasiswa')
        .update(Wallet)
        .set({
          saldo: data.saldo,
          updated_at: () => 'CURRENT_TIMESTAMP',
        })
        .where('id = :id', {
          id: id,
        })
        .execute();
      return this.getWalletById(id);
    } catch (err) {
      return this.getWalletById(id);
    }
  }
}
