export class UpdateMahasiswaDTO {
  nim: string;
  nama: string;
  alamat: string;
  nomor_hp: string;
  judul: string;
  updated_at: Date;
  tanggal_lulus: Date;
  dosen1: number;
  dosen2: number;
  ketua_penguji: number;
}

export class ItemListMahasiswaDTO {
  id: string;
  nim: string;
  nama: string;
}

export class DetailMahasiswaDTO {
  id: string;
  nim: string;
  nama: string;
  alamat: string;
  nomor_hp: string;
  judul: string;
  tanggal_lulus: Date;
  dosen1_nama: string;
  dosen1_jenis: string;
  dosen1_nomor: string;
  dosen2_nama: string;
  dosen2_jenis: string;
  dosen2_nomor: string;
  ketua_penguji_nama: string;
  ketua_penguji_jenis: string;
  ketua_penguji_nomor: string;
}
