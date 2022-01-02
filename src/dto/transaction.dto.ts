//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({type:'varchar', length:50, nullable:false})
//   customer: string;
//   @Column({type:'enum', enum:TransactionType, default:TransactionType.in})
//   tipe: TransactionType;
//   @ManyToOne(() => Service, service => service.transaction)
//   service: number;
//   @Column({type:'int', nullable:false})
//   harga: number;
//   @Column({type:'int', nullable:false})
//   qty: number;
//   @Column({type:'int', nullable:false})
//   total: number;
//   @Column({type:'text', nullable:true, default:""})
//   detail: string;
//   @ManyToOne(() => Wallet, wallet => wallet.transaction)
//   wallet: number;
//   @ManyToOne(() => User, user => user.transaction)
//   user: number;
//   @Column({type:'timestamp', nullable:true, default:  () => 'CURRENT_TIMESTAMP'})
//   date: Date;
//   @Column({type:'timestamp', nullable:true, default:  () => 'CURRENT_TIMESTAMP'})
//   created_at: Date;
//   @Column({type:'timestamp', nullable:true})
//   updated_at: Date;

import { TransactionType } from 'src/entity/transaction.entity';

export class CreateTransactionDTO {
  customer: string;
  tipe: TransactionType;
  service: number;
  harga: number;
  qty: number;
  detail: string;
  user: number;
  date: Date;
}

export class ItemTransactionDTO extends CreateTransactionDTO {
  id: number;
  created_at: Date;
}
