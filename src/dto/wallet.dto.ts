// @PrimaryGeneratedColumn()
// id: number;
// @Column({type:'varchar', length:50, nullable:false})
// label: string;
// @Column({type:'int', nullable:true})
// saldo: string;
// @Column({type:'timestamp', nullable:true, default:  () => 'CURRENT_TIMESTAMP'})
// created_at: Date;
// @Column({type:'timestamp', nullable:true})
// updated_at: Date;
// @OneToMany(() => Transaction, transaction => transaction.wallet)
// transaction: Transaction[];
// }

export class WalletDTO {
  id: number;
  label: string;
  saldo: number;
  updated_at: Date;
}

export class UpdateWalletDTO {
  saldo: number;
}
