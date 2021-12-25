import {
  Injectable
} from '@nestjs/common';
import {
  InjectRepository
} from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import {
  UpdateMahasiswaDTO
} from 'src/dto/mahasiswa.dto';
import {
  Mahasiswa
} from 'src/entity/mahasiswa.entity';
import {
  Repository
} from 'typeorm';
import {
  ExecResponseDTO
} from '../dto/standard-response.dto'

@Injectable()
export class MahasiswaService {
  constructor(@InjectRepository(Mahasiswa) private mahasiswaRepository: Repository < Mahasiswa > ) {}

  // GetAll
  async getAll(): Promise < [Mahasiswa[], number] > {
    let UserList = await this.mahasiswaRepository
      .createQueryBuilder("mahasiswa")
      .leftJoinAndSelect("mahasiswa.dosen1", "dosen1")
      .leftJoinAndSelect("mahasiswa.dosen2", "dosen2")
      .getManyAndCount();
    return UserList
  }

  // GetDetail
  async getDetail(reqId: number): Promise < Mahasiswa > {
    try {
      let UserDetail = await this.mahasiswaRepository
        .createQueryBuilder("mahasiswa")
        .leftJoinAndSelect("mahasiswa.dosen1", "dosen1")
        .leftJoinAndSelect("mahasiswa.dosen2", "dosen2")
        .where({
          id: reqId
        })
        .getOneOrFail()
      return UserDetail
    } catch (error) {
      throw error
    }
  }

  // Create
  create(user: Mahasiswa): ExecResponseDTO {
    const newMhsw = this.mahasiswaRepository.create({
      nama: user.nama,
      nim: user.nim
    });
    try {
      this.mahasiswaRepository.save(newMhsw);
      return {
        status: true,
        description: `User with NIM ${user.nim} is created`
      }
    } catch (error) {
      return {
        status: false,
        description: `Create user failed, ${error}`
      }
    }
  }

  // Delete
  async delete(reqId: number): Promise < ExecResponseDTO > {
    const detailMhsw = await this.getDetail(reqId)
    if (!detailMhsw) {
      return {
        status: false,
        description: `Delete failed, can't find data`
      }
    } else {
      this.mahasiswaRepository.remove(detailMhsw)
      return {
        status: true,
        description: `Data with NIM: ${detailMhsw.nim} successfully deleted`
      }
    }
  }

  // Update
  async update(userId: number, req: UpdateMahasiswaDTO): Promise < ExecResponseDTO > {
    try {
      this.mahasiswaRepository.createQueryBuilder('mahasiswa')
        .update(Mahasiswa)
        .set({
          nama: req.nama,
          alamat: req.alamat,
          nomor_hp: req.nomor_hp,
          judul: req.judul,
          dosen1: req.dosen1,
          dosen2: req.dosen2,
          updated_at: () => 'CURRENT_TIMESTAMP'
        })
        .where("id = :id", {
          id: userId
        })
        .execute()
      return {
        status: true,
        description: `User updated`
      }
    } catch (error) {
      return {
        status: false,
        description: `Update user failed, ${error}`
      }
    }
  }

}