import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 10, nullable: false })
  kode: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  nama: string;
  @Column({ type: 'int', nullable: true })
  harga: string;
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @OneToMany(() => Transaction, (transaction) => transaction.service)
  transaction: Transaction[];
}
