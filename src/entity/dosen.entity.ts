import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum DosenType {
  NIP = "NIP",
  NIDN = "NIDN"
}

@Entity('dosen')
export class Dosen {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type:'varchar', length:50, nullable:false})
  nama: string;
  @Column({type:'enum', enum:DosenType, default:DosenType.NIP})
  tipe: DosenType;
  @Column({type:'varchar', length:20 , default:'', nullable:true})
  nomor: string;
  @Column({type:'timestamp', nullable:false, default:  () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
  @Column({type:'timestamp', nullable:false, default: null})
  updated_at: Date;
}