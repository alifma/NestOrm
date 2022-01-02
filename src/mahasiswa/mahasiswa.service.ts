import {
  Injectable,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DetailMahasiswaDTO,
  ItemListMahasiswaDTO,
  UpdateMahasiswaDTO,
} from 'src/dto/mahasiswa.dto';
import { Mahasiswa } from 'src/entity/mahasiswa.entity';
import { QueryFailedError, Repository } from 'typeorm';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from '../dto/standard-response.dto';

@Injectable()
export class MahasiswaService {
  constructor(
    @InjectRepository(Mahasiswa)
    private mahasiswaRepository: Repository<Mahasiswa>,
  ) {}

  // GetAll
  async getAll(
    limit: number,
    page: number,
    sort: string,
  ): Promise<StandardResponseDTO> {
    const count: number = await this.getCountParticipant();
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 20;
    }
    if (
      !sort ||
      (sort.toUpperCase() !== 'ASC' && sort.toUpperCase() !== 'DESC')
    ) {
      sort = 'ASC';
    }
    const totalPage: number = Math.ceil(count / limit);
    try {
      let finalRes: StandardResponseDTO;
      await this.mahasiswaRepository.manager
        .query(
          `
      SELECT 
        mhs.id as id, 
        mhs.nim as nim,
        mhs.nama as nama
      FROM mahasiswa mhs
      ORDER BY mhs.nim ` +
            sort +
            ` LIMIT ? OFFSET ? 
      `,
          [limit, limit * (page - 1)],
        )
        .then((res: ItemListMahasiswaDTO[]) => {
          finalRes = {
            total_pages: totalPage,
            per_page: limit,
            total_data: count,
            page: page,
            list: res,
          };
        })
        .catch((err) => {
          throw err;
        });
      return finalRes;
    } catch (error) {
      throw error;
    }
  }

  // GetDetail
  async getDetail(reqId: number): Promise<Mahasiswa> {
    try {
      let UserDetail = await this.mahasiswaRepository
        .createQueryBuilder('mahasiswa')
        .leftJoinAndSelect('mahasiswa.dosen1', 'dosen1')
        .leftJoinAndSelect('mahasiswa.dosen2', 'dosen2')
        .leftJoinAndSelect('mahasiswa.ketua_penguji', 'ketua_penguji')
        .where({
          id: reqId,
        })
        .getOneOrFail();
      return UserDetail;
    } catch (error) {
      throw error;
    }
  }

  // Create
  create(user: Mahasiswa): ExecResponseDTO {
    const newMhsw = this.mahasiswaRepository.create({
      nama: user.nama,
      nim: user.nim,
    });
    try {
      this.mahasiswaRepository.save(newMhsw);
      return {
        status: true,
        description: `User with NIM ${user.nim} is created`,
      };
    } catch (error) {
      return {
        status: false,
        description: `Create user failed, ${error}`,
      };
    }
  }

  // Delete
  async delete(reqId: number): Promise<ExecResponseDTO> {
    const detailMhsw = await this.getDetail(reqId);
    if (!detailMhsw) {
      return {
        status: false,
        description: `Delete failed, can't find data`,
      };
    } else {
      this.mahasiswaRepository.remove(detailMhsw);
      return {
        status: true,
        description: `Data with NIM: ${detailMhsw.nim} successfully deleted`,
      };
    }
  }

  // Update
  async update(
    userId: number,
    req: UpdateMahasiswaDTO,
  ): Promise<ExecResponseDTO> {
    try {
      this.mahasiswaRepository
        .createQueryBuilder('mahasiswa')
        .update(Mahasiswa)
        .set({
          nama: req.nama,
          alamat: req.alamat,
          nomor_hp: req.nomor_hp,
          judul: req.judul,
          dosen1: req.dosen1,
          dosen2: req.dosen2,
          ketua_penguji: req.ketua_penguji,
          tanggal_lulus: req.tanggal_lulus,
          updated_at: () => 'CURRENT_TIMESTAMP',
        })
        .where('id = :id', {
          id: userId,
        })
        .execute();
      return {
        status: true,
        description: `User updated`,
      };
    } catch (error) {
      return {
        status: false,
        description: `Update user failed, ${error}`,
      };
    }
  }

  async getCountParticipant(): Promise<number> {
    return await this.mahasiswaRepository.count();
  }

  // GetDetail
  async getDetailed(reqId: number): Promise<DetailMahasiswaDTO> {
    try {
      return await this.mahasiswaRepository.manager
        .query(
          `
      SELECT 
        mhs.id as id, 
        mhs.nim as nim, 
        mhs.nama as nama, 
        mhs.alamat as alamat, 
        mhs.nomor_hp as nomor_hp, 
        mhs.judul as judul, 
        mhs.tanggal_lulus as tanggal_lulus,
        dsn1.nama as dosen1_nama, 
        dsn1.nomor as dosen1_nomor,
        dsn1.tipe as dosen1_tipe,
        dsn2.nama as dosen2_nama, 
        dsn2.nomor as dosen2_nomor,
        dsn2.tipe as dosen2_tipe,
        ketPenguji.nama as ketua_penguji_nama, 
        ketPenguji.nomor as ketua_penguji_nomor,
        ketPenguji.tipe as ketua_penguji_tipe
      FROM mahasiswa mhs
      LEFT JOIN dosen dsn1 ON dsn1.id = mhs.dosen1Id
      LEFT JOIN dosen dsn2 ON dsn2.id = mhs.dosen2Id
      LEFT JOIN dosen ketPenguji ON ketPenguji.id = mhs.ketuaPengujiId
      WHERE mhs.id = ?`,
          [reqId],
        )
        .then((res: DetailMahasiswaDTO[]) => {
          return res[0];
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      throw error;
    }
  }
}
