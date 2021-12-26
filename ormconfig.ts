import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['dist/src/entity/*.entity.js'],
  migrations: [
    'dist/src/db/migrations/*.js'
  ],
  cli: {
    migrationsDir: 'src/db/migrations'
  }
}

export default config;