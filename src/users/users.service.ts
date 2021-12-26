import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, ListUserDTO, UpdateUserDTO } from 'src/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { ExecResponseDTO, StandardResponseDTO } from 'src/dto/standard-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({username: username})
  }

  async getAll(limit: number, page:number, sort:string): Promise <StandardResponseDTO> {
    const count:number = await this.getCountParticipant()
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
      let finalRes:StandardResponseDTO
      await this.usersRepository.manager.query(`
      SELECT 
        user.id as id, 
        user.username as username,
        user.nama as nama,
        user.level as level
      FROM user
      ORDER BY user.id `+sort+` LIMIT ? OFFSET ? 
      `, [limit, limit*(page-1)])
        .then((res: ListUserDTO[]) => {
          finalRes = {
            total_pages: totalPage,
            per_page: limit,
            total_data:count,
            page:page,
            list:res
          }
        })
        .catch((err) => {
          throw err
        })
    return finalRes
    } catch (error) {
      throw error
    }
  }

  async getOneById(id:number): Promise<User> {
    try {
      const user = await  this.usersRepository.findOneOrFail(id);
      return user
    } catch (error) {
      throw error
    }
  }

  async create(body:CreateUserDTO): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);
    const newUser = this.usersRepository.create({nama: body.nama, password: hash, username: body.username, level: body.level});
    return this.usersRepository.save(newUser);
  }

  async update(id:number, data:UpdateUserDTO): Promise<ExecResponseDTO> {
    try {
      const oldUser = await this.getOneById(id)
      const isEqual = await bcrypt.compare(oldUser.password, data.oldpassword);
      if (!isEqual) {
        return {
          status: false,
          description: `Old password is wrong`
        }
      }
      const saltOrRounds = 10;
      const newPassword = await bcrypt.hash(data.password, saltOrRounds);
      this.usersRepository.createQueryBuilder('user')
      .update(User)
      .set({
        nama:data.nama,
        username: data.username,
        password: newPassword,
        updated_at: () => 'CURRENT_TIMESTAMP'
      })
      .where("id = :id", {id: id})
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
    if (user) {
      this.usersRepository.remove(user)
      return {
        status: true,
        description: `Data ${user.username} successfully deleted`
      }
    } else {
      return {
        status: false,
        description: `Delete failed, can't find data`
      }
    }
  }
  async getCountParticipant(): Promise<number> {
    return await this.usersRepository.count()
  }  
}
