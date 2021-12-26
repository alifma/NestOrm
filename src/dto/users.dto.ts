export class CreateUserDTO {
  username: string;
  password: string;
  nama: string;
  level: number;
}

export class UpdateUserDTO {
  username: string;
  password: string;
  oldpassword: string;
  nama: string;
  level: number;
}

export class ListUserDTO {
  id: number;
  username: string;
  nama: string;
  level: number;
}