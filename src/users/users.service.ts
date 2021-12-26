import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/users.dto';
import * as bcrypt from 'bcrypt';

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

  async createUser(body:CreateUserDTO): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);
    const newUser = this.usersRepository.create({nama: body.nama, password: hash, username: body.username, level: body.level});
    return this.usersRepository.save(newUser);
  }

  async updateUser(id:number, name:string): Promise<User> {
    const user = await this.getOneById(id);
    user.nama = name
    return this.usersRepository.save(user); 
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id)
    return this.usersRepository.remove(user)
  }
  
}
