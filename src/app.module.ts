import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'ormconfig'
import { User } from './entity/user.entity';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { Photo } from './entity/photo.entity';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Photo]),
    MahasiswaModule,
    PhotoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
