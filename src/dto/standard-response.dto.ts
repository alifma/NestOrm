export class StandardResponseDTO {
  total_pages: number;
  per_page: number;
  page: number;
  total_data: number;
  list: any[];
}

export class ExecResponseDTO {
  status: boolean;
  description: string;
}
