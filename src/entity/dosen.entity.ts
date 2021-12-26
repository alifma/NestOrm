import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Mahasiswa } from "./mahasiswa.entity";

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
  @Column({type:'timestamp', nullable:true, default:  () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
  @Column({type:'timestamp', nullable:true})
  updated_at: Date;
  @OneToMany(() => Mahasiswa, mahasiswa => mahasiswa.dosen1)
  mahasiswa: Mahasiswa[];
}