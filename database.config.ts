import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService){}
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
      return this.configService.get('database');
  }
}

export class JwtConfig {
  constructor(private configService: ConfigService){}
  createJWTConfig(): string {
    return this.configService.get('jwt_secret');
  }
}