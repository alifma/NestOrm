import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dosen } from './dosen.entity';
import { Mail } from './mail.entity';

@Entity('mahasiswa')
export class Mahasiswa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 10, nullable: false })
  nim: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  nama: string;
  @Column({ type: 'text', nullable: true })
  alamat: string;
  @Column({ length: 15, nullable: true })
  nomor_hp: string;
  @Column({ type: 'varchar', nullable: true })
  judul: string;
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  tanggal_lulus: Date;
  @ManyToOne(() => Dosen, (dosen) => dosen.mahasiswa)
  dosen1: number;
  @ManyToOne(() => Dosen, (dosen) => dosen.mahasiswa)
  dosen2: number;
  @ManyToOne(() => Dosen, (dosen) => dosen.mahasiswa)
  ketua_penguji: number;
  @OneToMany(() => Mail, (mail) => mail.mahasiswa)
  mail: Mail[];
}
