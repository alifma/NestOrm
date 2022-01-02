import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
export enum MailType {
  bebasPustaka = 'Bebas Pustaka',
  serahTerima = 'Serah Terima Skripsi',
}

@Entity('mail')
export class Mail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', nullable: true })
  number: number;
  @Column({ type: 'varchar', length: 25, nullable: true })
  mail_number: string;
  @Column({
    type: 'enum',
    enum: MailType,
    default: MailType.serahTerima,
    nullable: false,
  })
  tipe: MailType;
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @ManyToOne(() => Mahasiswa, (mhsw) => mhsw.mail)
  mahasiswa: number;
  @ManyToOne(() => User, (user) => user.mail)
  user: number;
}
