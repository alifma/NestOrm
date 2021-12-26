import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDosenDTO, UpdateDosenDTO } from 'src/dto/dosen.dto';
import { ExecResponseDTO, StandardResponseDTO } from 'src/dto/standard-response.dto';
import { Dosen } from 'src/entity/dosen.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DosenService {
  constructor(@InjectRepository(Dosen) private dosenRepository: Repository<Dosen>){}
  async getAll(limit: number, page:number, sort:string): Promise <StandardResponseDTO> {
    const count:number = await this.getCount()
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 20
    }
    if (!sort || (sort.toUpperCase() !== 'ASC' && sort.toUpperCase() !== 'DESC')) {
      sort = 'ASC'
    }
    const totalPage:number = Math.ceil(count/limit) 
    try {
      const res = await this.dosenRepository.find()
      return {
        total_pages: totalPage,
        per_page: limit,
        total_data:count,
        page:page,
        list:res
      }
    } catch (err) {
      throw err
    }
  }

  async getOneById(id:number): Promise<Dosen> {
    try {
      const user = await  this.dosenRepository.findOneOrFail(id);
      return user
    } catch (error) {
      throw error
    }
  }

  create(req:createDosenDTO): ExecResponseDTO {
    const newUser = this.dosenRepository.create({nama: req.nama, nomor:req.nomor, tipe:req.tipe});
    try {
      this.dosenRepository.save(newUser);
      return {
        status: true,
        description: `New user is created`
      }
    } catch (error) {
      this.dosenRepository.save(newUser);
      return {
        status: false,
        description: `Create user failed, ${error}`
      }
    }
  }

  async update(id:number, data:UpdateDosenDTO): Promise<ExecResponseDTO> {
    try {
      this.dosenRepository.createQueryBuilder('mahasiswa')
      .update(Dosen)
      .set({
        nama: data.nama,
        nomor: data.nomor,
        tipe: data.tipe,
        updated_at: () => 'CURRENT_TIMESTAMP'
      })
      .where("id = :id", {
        id: id
      })
      .execute()
      return {
        status: true,
        description: `Updated successfully`
      }
    } catch (err) {
      return {
        status: false,
        description: `Update user failed, ${err}`
      }
    }
  }

  async delete(id: number): Promise<ExecResponseDTO> {
    const user = await this.getOneById(id)
    if (!user) {
      return {
        status: false,
        description: `Delete failed, can't find data`
      }
    } else {
      this.dosenRepository.remove(user)
      return {
        status: true,
        description: `Data ${user.nomor} successfully deleted`
      }
    }
  }

  async getCount(): Promise<number> {
    return await this.dosenRepository.count()
  }
}
