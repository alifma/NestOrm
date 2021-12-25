import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/entity/photo.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    PhotoModule
  ],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
