import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50, nullable: false })
  label: string;
  @Column({ type: 'int', nullable: false, default: 0 })
  saldo: number;
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transaction: Transaction[];
}
