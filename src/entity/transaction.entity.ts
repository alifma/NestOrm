import internal from 'stream';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { User } from './user.entity';
import { Wallet } from './wallet.entity';
export enum TransactionType {
  in = 'in',
  out = 'out',
}
@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50, nullable: false })
  customer: string;
  @Column({ type: 'enum', enum: TransactionType, default: TransactionType.in })
  tipe: TransactionType;
  @ManyToOne(() => Service, (service) => service.transaction)
  service: number;
  @Column({ type: 'int', nullable: false })
  harga: number;
  @Column({ type: 'int', nullable: false })
  qty: number;
  @Column({ type: 'int', nullable: false })
  total: number;
  @Column({ type: 'text', nullable: true, default: '' })
  detail: string;
  @ManyToOne(() => Wallet, (wallet) => wallet.transaction)
  wallet: number;
  @ManyToOne(() => User, (user) => user.transaction)
  user: number;
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
