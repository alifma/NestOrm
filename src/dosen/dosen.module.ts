import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dosen } from 'src/entity/dosen.entity';
import { DosenController } from './dosen.controller';
import { DosenService } from './dosen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dosen]), DosenModule],
  controllers: [DosenController],
  providers: [DosenService],
  exports: [DosenService],
})
export class DosenModule {}
