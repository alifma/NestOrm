import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mahasiswa } from 'src/entity/mahasiswa.entity';
import { MahasiswaController } from './mahasiswa.controller';
import { MahasiswaService } from './mahasiswa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mahasiswa]), MahasiswaModule],
  controllers: [MahasiswaController],
  providers: [MahasiswaService],
})
export class MahasiswaModule {}
