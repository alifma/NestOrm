export class CreateServiceDTO {
  nama: string;
  kode: string;
  harga: string;
}

export class UpdateServiceDTO extends CreateServiceDTO {
  updated_at: Date;
}

export class ItemDetailServiceDTO extends CreateServiceDTO {
  id: number;
}
