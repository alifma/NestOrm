import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dosen } from "./dosen.entity";

@Entity('mahasiswa')
export class Mahasiswa {
  @PrimaryGeneratedColumn()
  @OneToMany( () => Mahasiswa, mhsw => mhsw.dosen1_id)
  id: number;
  @Column({length:10, nullable:false})
  nim: string;
  @Column({type:'varchar', length:50, nullable:false})
  nama: string;
  @Column({type:'text', nullable:true})
  alamat: string;
  @Column({length:15, nullable:true})
  nomor_hp: string;
  @Column({nullable:true})
  dosen1_id: number;
  @Column({nullable:true})
  dosen2_id: number;
  @Column({type:'varchar', nullable:true})
  judul: string;
  @Column({type:'timestamp', nullable:false, default:  () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
  @Column({type:'timestamp', nullable:false, default: null})
  updated_at: Date;
  @OneToMany(() => Dosen, dosen => dosen.nama)
  @JoinColumn({name: 'nama_dosen', referencedColumnName: 'nama'})
  dosen: Dosen;
}