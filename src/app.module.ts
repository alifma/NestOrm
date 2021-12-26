import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'config';
import { DatabaseConfig } from 'database.config';
import { DosenModule } from './dosen/dosen.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    TypeOrmModule.forFeature([User]),
    MahasiswaModule,
    DosenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
