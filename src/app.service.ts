import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecResponseDTO } from './dto/standard-response.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>){}
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

  createUser(name:string): Promise<User> {
    const newUser = this.usersRepository.create({name: name});
    return this.usersRepository.save(newUser);
  }

  async updateUser(id:number, name:string): Promise<User> {
    const user = await this.getOneById(id);
    user.name = name
    return this.usersRepository.save(user); 
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id)
    return this.usersRepository.remove(user)
  }
}
