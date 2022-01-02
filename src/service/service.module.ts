import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entity/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), ServiceModule],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
