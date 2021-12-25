import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/entity/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private photosRepository: Repository<Photo>){}
  getAll(): Promise<Photo[]> {
    return this.photosRepository.createQueryBuilder("photo")
    .leftJoinAndSelect("photo.user", "user")
    .leftJoinAndSelect("photo.user2", "user2")
    .getMany();
  }
}
