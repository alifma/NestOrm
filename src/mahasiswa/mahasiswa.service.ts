import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MahasiswaDTO } from 'src/dto/mahasiswa.dto';
import { Dosen } from 'src/entity/dosen.entity';
import { Mahasiswa } from 'src/entity/mahasiswa.entity';
import { Repository } from 'typeorm';
import {ExecResponseDTO} from '../dto/standard-response.dto'

@Injectable()
export class MahasiswaService {
  constructor(@InjectRepository(Mahasiswa) private mahasiswaRepository: Repository<Mahasiswa>){}

  async getAll(): Promise<[Mahasiswa[], number]> {
    let UserList = await this.mahasiswaRepository
    .createQueryBuilder('mhs')
    .leftJoinAndSelect(Dosen,'dosen', 'dosen.id = mhs.dosen1_id')
    .select("mhs.nama")
    .getMany()
    return [UserList, 0]
  }

  async getDetail(id:number): Promise<Mahasiswa> {
    try {
      let UserList = await this.mahasiswaRepository.findOneOrFail(id=id)
      return UserList
    } catch (error) {
      throw error
    }
  }

  create(user:Mahasiswa): ExecResponseDTO {
    const newMhsw = this.mahasiswaRepository.create({nama:user.nama, nim:user.nim});
    try {
      this.mahasiswaRepository.save(newMhsw);
      return {status: true, description: `User with NIM ${user.nim} already created`}
    } catch (error) {
      return {status: false, description: `Create user failed, ${error}`}
    }
  }

}
