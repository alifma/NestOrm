import { DosenType } from 'src/entity/dosen.entity';

export class createDosenDTO {
  nama: string;
  tipe: DosenType;
  nomor: string;
}

export class UpdateDosenDTO extends createDosenDTO {
  updated_at: Date;
}

export class ItemDetailDosenDTO extends createDosenDTO {
  id: number;
}
