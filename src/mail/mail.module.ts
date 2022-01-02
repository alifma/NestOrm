import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from 'src/entity/mail.entity';
import { DosenModule } from 'src/dosen/dosen.module';
import { MahasiswaModule } from 'src/mahasiswa/mahasiswa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mail]),
    MailModule,
    DosenModule,
    MahasiswaModule,
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
