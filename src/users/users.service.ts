import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { ExecResponseDTO } from 'src/dto/standard-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({username: username})
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find()
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
  
}
