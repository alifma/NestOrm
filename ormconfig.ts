import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'alifma',
  password: ' ',
  database: 'db_test',
  entities: ['dist/src/entity/*.entity.js'],
  synchronize: true,
  migrations: [
    'dist/src/db/migrations/*.js'
  ],
  cli: {
    migrationsDir: 'src/db/migrations'
  },
}

export default ormConfig;