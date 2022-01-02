import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDTO, UpdateServiceDTO } from 'src/dto/service.dto';
import {
  ExecResponseDTO,
  StandardResponseDTO,
} from 'src/dto/standard-response.dto';
import { Service } from 'src/entity/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}
  async getAll(
    limit: number,
    page: number,
    sort: string,
  ): Promise<StandardResponseDTO> {
    const count: number = await this.getCount();
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
      const res = await this.serviceRepository.find();
      return {
        total_pages: totalPage,
        per_page: limit,
        total_data: count,
        page: page,
        list: res,
      };
    } catch (err) {
      throw err;
    }
  }

  async getOneById(id: number): Promise<Service> {
    try {
      const user = await this.serviceRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  create(req: CreateServiceDTO): ExecResponseDTO {
    const newUser = this.serviceRepository.create({
      nama: req.nama,
      harga: req.harga,
      kode: req.kode,
    });
    try {
      this.serviceRepository.save(newUser);
      return {
        status: true,
        description: `New user is created`,
      };
    } catch (error) {
      this.serviceRepository.save(newUser);
      return {
        status: false,
        description: `Create user failed, ${error}`,
      };
    }
  }

  async update(id: number, data: UpdateServiceDTO): Promise<ExecResponseDTO> {
    try {
      this.serviceRepository
        .createQueryBuilder('mahasiswa')
        .update(Service)
        .set({
          nama: data.nama,
          harga: data.harga,
          kode: data.kode,
          updated_at: () => 'CURRENT_TIMESTAMP',
        })
        .where('id = :id', {
          id: id,
        })
        .execute();
      return {
        status: true,
        description: `Updated successfully`,
      };
    } catch (err) {
      return {
        status: false,
        description: `Update user failed, ${err}`,
      };
    }
  }

  async delete(id: number): Promise<ExecResponseDTO> {
    const item = await this.getOneById(id);
    if (!item) {
      return {
        status: false,
        description: `Delete failed, can't find data`,
      };
    } else {
      this.serviceRepository.remove(item);
      return {
        status: true,
        description: `Data ${item.nama} successfully deleted`,
      };
    }
  }

  async getCount(): Promise<number> {
    return await this.serviceRepository.count();
  }
}
