import { Controller, Get } from '@nestjs/common';
import { Photo } from 'src/entity/photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async  getAll(): Promise<Photo[]> {
    return this.photoService.getAll(); 
  }
}
