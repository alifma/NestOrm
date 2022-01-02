import { MailType } from 'src/entity/mail.entity';

export class PrintSerahTerimaDTO {
  surat_nomor: string;
  kalab_nama: string;
  kalab_jenis: string;
  kalab_nip: string;
  mhsw_nama: string;
  mhsw_nim: string;
  mhsw_judul: string;
  mhsw_tanggal_lulus: string;
  ketua_penguji_nama: string;
  dosen1_nama: string;
  dosen2_nama: string;
  surat_tanggal_cetak: string;
}

export class MailDTO {
  id: number;
  surat_nomor: string;
  tipe: string;
  mahasiswaId: number;
  mhsw_nama: string;
  mhsw_nim: string;
  mhsw_judul: string;
  mhsw_tanggal_lulus: Date;
  dosen1Id: number;
  dosen2Id: number;
  ketuaPengujiId: number;
  surat_tanggal_cetak: Date;
}

export class NewSerahTerimaDTO {
  number: number;
  tipe: MailType;
  mahasiswaId: number;
  user: number;
  created_at: Date;
}

export class ItemMailDTO {
  id: number;
  surat_nomor: string;
  tipe: string;
  mhsw_nama: string;
  mhsw_nim: string;
  surat_tanggal_cetak: Date;
  user_nama: string;
}
